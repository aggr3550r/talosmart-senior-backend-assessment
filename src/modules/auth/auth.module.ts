import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/data/user.repository';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';
import { UserModule } from '../user/user.module';
import { Repository } from 'typeorm';

@Module({
  imports: [UserModule],
  providers: [AuthService, UserService, UserRepository, Repository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
