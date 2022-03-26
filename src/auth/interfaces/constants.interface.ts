export type TokenType = 'access' | 'refresh';

export interface IJwtConstants {
  accessType: TokenType;
  refreshType: TokenType;
}
