import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { IAuth } from '../auth.interface';

export class AuthSignupDTO implements IAuth {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  name: string;
}
