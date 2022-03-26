import { Expose } from 'class-transformer';
import { IToken } from '../interfaces/token.interface';

export class TokenSerializer implements IToken {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
