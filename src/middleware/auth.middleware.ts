import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../modules/user/data/user.entity';
import { UserService } from '../modules/user/user.service';
import SecurityUtil from '../util/security.util';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
      user?: User;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token: unknown;
    if (
      req?.headers?.authorization &&
      req?.headers?.authorization.startsWith('Bearer')
    ) {
      token = req?.headers?.authorization.split(' ')[1];
    } else if (req?.cookies?.jwt) {
      token = req?.cookies?.jwt;
    }

    if (!token) {
      throw new UnauthorizedException('User not currently logged in!');
    }

    // Decode JWT
    const decoded = await SecurityUtil.verifyTokenWithSecret(
      token,
      process.env.JWT_SECRET,
    );

    const person = await this.userService.getUserById(decoded['id']);

    if (!person) throw new NotFoundException('User was not found.');

    console.info('currently logged in user', person);

    // GRANT ACCESS TO PROTECTED ROUTE
    req.currentUser = person;
    res.locals.user = person;
    res.locals.currentUser = person;

    next();
  }
}
