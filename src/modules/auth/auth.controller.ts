import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import AuthService from './auth.service';
import { ILoginDTO, ISignUpDTO } from './dtos/auth.dto';
import { ResponseModel } from '../../models/response.model';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() payload: ISignUpDTO) {
    try {
      const response = await this.authService.signup(payload);

      return new ResponseModel(
        HttpStatus.CREATED,
        'Hurrah! Signup successful.',
        response,
      );
    } catch (error) {
      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || 'Operation failed.',
        null,
      );
    }
  }

  @Post('login')
  async login(@Body() payload: ILoginDTO, @Res() res: Response) {
    try {
      let authToken: string;
      const response = await this.authService.login(payload);

      if (response) {
        authToken = await this.authService.createAndSendAuthToken(
          response,
          res,
        );
      }

      return new ResponseModel(HttpStatus.OK, 'Login Successful.', {
        response,
        authToken,
      });
    } catch (error) {
      return new ResponseModel(
        error?.statusCode || HttpStatus.BAD_REQUEST,
        error?.message || 'Operation failed.',
        null,
      );
    }
  }
}
