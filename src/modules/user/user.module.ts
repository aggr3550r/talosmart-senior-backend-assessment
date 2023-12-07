import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './data/user.entity';
import { UserService } from './user.service';
import { UserRepository } from './data/user.repository';
import { UserController } from './user.controller';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository, Repository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
