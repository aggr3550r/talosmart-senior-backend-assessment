import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import SecurityUtil from '../../util/security.util';
import { LoginDTO, SignUpDTO } from './dtos/auth.dto';
import { AppError } from '../../exceptions/app.error';
import { UserService } from '../user/user.service';
import { User } from '../user/data/user.entity';

@Injectable()
export default class AuthService {
  constructor(private userService: UserService) {}

  /**
   * This method creates a JWT token to be sent to the client which it will use to make subsequent requests to protected routes.
   * @param user
   * @param statusCode
   * @param res
   */
  async createAndSendAuthToken(user: User, res: Response) {
    try {
      const token = await SecurityUtil.generateTokenWithSecret(user);

      const cookieOptions: any = {
        expires: new Date(
          Date.now() +
            (Number(process.env.JWT_COOKIE_EXPIRES_IN) ?? 24) *
              24 *
              60 *
              60 *
              1000,
        ),
        httpOnly: true,
      };
      if (process.env.NODE_ENV === 'production' || 'prod' || 'prd')
        cookieOptions['secure'] = true;

      res.cookie('jwt', token, cookieOptions);

      // Remove password from output
      user.password = undefined;

      return token;
    } catch (error) {
      console.error('createAndSendAuthToken() error', error);
      throw new AppError(
        error?.message || 'Could not complete user signup.',
        error?.status || 400,
      );
    }
  }

  async signup(data: SignUpDTO) {
    try {
      let { password } = data;
      const encryptedPassword = await SecurityUtil.encryptPassword(password);
      Object.assign(data, { password: encryptedPassword });

      return await this.userService.createUser(data);
    } catch (error) {
      console.error('signup() error', error);
      throw new AppError(
        error?.message || 'Could not complete user signup.',
        error?.statusCode || 400,
      );
    }
  }

  async login(data: LoginDTO) {
    try {
      const user = await this.userService.findUserByEmail(data.email);

      if (!user) {
        throw new NotFoundException('Could not find user with that email.');
      }

      const verificationResult = await SecurityUtil.decryptAndVerifyPassword(
        data.password,
        user,
      );

      return verificationResult;
    } catch (error) {
      console.error('login() error', error);
      throw new AppError(
        error?.message || 'Could not complete user login.',
        error?.statusCode || 400,
      );
    }
  }
}
