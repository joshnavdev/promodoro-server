import { Exclude, Expose } from 'class-transformer';
import { IToken } from '../interfaces/token.interface';

export class TokenSerializer implements IToken {
  @Expose()
  access_token: string;

  @Exclude()
  reflesh_token: string;
}
