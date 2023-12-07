import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDTO } from '../../user/dtos/user.dto';

export class SignUpDTO extends CreateUserDTO {}

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ISignUpDTO extends SignUpDTO {}
export class ILoginDTO extends LoginDTO {}
