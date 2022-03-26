export interface IConfig {
  database: IDatabaseConfig;
  jwt: IJwtConfig;
}

export interface IDatabaseConfig {
  uri: string;
}

export interface IJwtConfig {
  secret: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
}
