import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/data/user.repository';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [],
  providers: [UserService, UserRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
