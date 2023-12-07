import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppError } from '../../exceptions/app.error';
import { CreateUserDTO, UpdateUserDTO, UserQueryDTO } from './dtos/user.dto';
import { User } from './data/user.entity';
import { UserRepository } from './data/user.repository';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async getUserById(userId: string) {
    try {
      return await this.userRepository.findById(userId);
    } catch (error) {
      console.error('getUserById() error', error);

      throw new AppError(
        error?.message || 'An error occurred while retrieving user.',
        error?.statusCode || 400,
      );
    }
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    try {
      const userAlreadyExists = await this.userRepository.findByEmail(
        data?.email,
      );

      console.info('USER EXISTS HELLOOO \n %o', userAlreadyExists);

      if (userAlreadyExists) {
        throw new ConflictException('User already exists');
      }

      return this.userRepository.create(data);
    } catch (error) {
      console.error('createUser() error', error);

      throw new AppError(
        error?.message || 'An error occurred while creating user.',
        error?.statusCode || 400,
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundException(
          `Could not find user with email ${user?.email}.`,
        );
      }

      return user;
    } catch (error) {
      console.error('findUserByEmail() error', error);

      throw new AppError(
        error?.message || 'An error occurred while getting user by email.',
        error?.statusCode || 400,
      );
    }
  }

  async updateUser(userId: string, data: UpdateUserDTO) {
    try {
      return await this.userRepository.update(userId, data);
    } catch (error) {
      console.error('updateUser() error', error);

      throw new AppError(
        error?.message || 'An error occurred while updating user.',
        error?.statusCode || 400,
      );
    }
  }
}
