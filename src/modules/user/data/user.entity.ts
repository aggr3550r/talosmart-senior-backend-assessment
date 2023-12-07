import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../models/base.model';

@Entity('user')
export class User extends BaseModel {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;
}
