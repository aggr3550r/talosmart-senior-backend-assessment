import { ConflictException, Injectable } from '@nestjs/common';
import { AppError } from '../../exceptions/app.error';
import { FindOneOptions } from 'typeorm';
import { CreateUserDTO } from './dtos/user.dto';
import { User } from './data/user.entity';

@Injectable()
export class UserService {
  constructor() {}

  async createUser(data: CreateUserDTO): Promise<User> {
    try {
      const options: FindOneOptions<User> = {
        where: {
          email: data.email,
          is_active: true,
        },
      };
      const userAlreadyExists = await this.userRepository.findOne(options);

      if (userAlreadyExists) {
        throw new ConflictException('User already exists');
      }

      const newUser = this.userRepository.create(data);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('createUser() error', error);

      throw new AppError(
        error?.message || 'An error occurred while creating user.',
        error?.statusCode || 400,
      );
    }
  }
}
