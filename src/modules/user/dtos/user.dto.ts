import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  public readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  public readonly last_name: string;
}

export class UpdateUserDTO {}

export class UserQueryDTO {
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  public readonly first_name?: string;

  @IsNotEmpty()
  public readonly last_name?: string;
}
