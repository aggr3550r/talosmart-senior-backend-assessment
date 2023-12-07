import { CreateUserDTO } from '../../user/dtos/user.dto';

export class SignUpDTO extends CreateUserDTO {}

export class LoginDTO {
  email: string;
  password: string;
}


export type ISignUpDTO = {} & SignUpDTO;
export type ILoginDTO = {} & LoginDTO;