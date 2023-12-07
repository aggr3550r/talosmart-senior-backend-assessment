import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../interfaces/database/IUserRepository';

@Injectable()
export class UserRepository<T> implements IUserRepository<T> {
  findById(): Promise<T> {
    throw new Error('Method not implemented.');
  }
  create(): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<T> {
    throw new Error('Method not implemented.');
  }
  filter(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
