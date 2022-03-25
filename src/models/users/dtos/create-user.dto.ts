import { IUser } from '../users.interface';

export class CreateUserDTO implements IUser {
  email: string;
  password: string;
  name?: string;
}
