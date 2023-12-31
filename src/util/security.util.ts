import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import * as JWT from 'jsonwebtoken';
import { ResponseModel } from '../models/response.model';
import { NotFoundException } from '@nestjs/common';
import { User } from '../modules/user/data/user.entity';
import { AppError } from '../exceptions/app.error';

const scrypt = promisify(_scrypt);

export default class SecurityUtil {
  static async generateTokenWithSecret(user: User): Promise<string> {
    const { id } = user;
    return JWT.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  static async verifyTokenWithSecret(token: any, secretKey: string) {
    try {
      const decoded = JWT.verify(token, secretKey);
      return new ResponseModel(200, 'Success', decoded);
    } catch (error) {
      console.error('verifyTokenWithSecret error() \n %o', error);
      return new ResponseModel(
        error?.status || 400,
        error.message.toString().toLocaleUpperCase() ||
          'Error occurred while verifying JWT token.',
        null,
      );
    }
  }

  static async encryptPassword(password: string) {
    try {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const encryptedPassword = salt.concat('.', hash.toString('hex'));

      return encryptedPassword;
    } catch (error) {
      console.log('An error occured while encrypting this password.');
      console.log(error);
    }
  }

  static async decryptAndVerifyPassword(clientPassword: string, user: User) {
    try {
      const userPassword = user?.password;

      if (!userPassword)
        throw new NotFoundException('Could not find password for that user');

      const [salt, storedHash] = userPassword.split('.');

      const hash = (await scrypt(clientPassword, salt, 32)) as Buffer;

      if (storedHash === hash.toString('hex')) {
        return user;
      } else {
        throw new AppError('Password Incorrect', 400);
      }
    } catch (error) {
      console.error('decryptAndVerifyPassword() error \n %o', error);

      throw new AppError(
        error?.message || 'Error occured while trying to verify that password',
        error?.statusCode || 400,
      );
    }
  }
}
