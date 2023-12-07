import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../interfaces/database/IUserRepository';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';

@Injectable()
export class UserRepository implements IUserRepository<User> {
  constructor(
    private repository: Repository<User>,
    private dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(User);
  }

  async findById(id: string): Promise<User> {
    let user = await this.repository.findOne({
      where: {
        id,
        is_active: true,
      },
    });


    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
        is_active: true,
      },
    });

    return user;
  }

  async create(data: CreateUserDTO): Promise<User> {
    let newUser = this.repository.create(data);
    newUser = await this.repository.save(newUser);

    newUser.password = undefined;

    return newUser;
  }

  async update(id: string, data: UpdateUserDTO): Promise<void> {
    await this.repository.update({ id }, data);
  }

  async delete(id: string): Promise<void> {
    const response = await this.repository.update({ id }, { is_active: false });

    if (response.affected < 1) {
      throw new BadRequestException(
        `Could not delete user with that id ${id}. Check to make sure it exists.`,
      );
    }
  }

  async filter(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
