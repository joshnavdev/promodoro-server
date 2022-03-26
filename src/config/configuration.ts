import { IConfig } from './config.interface';

export default (): IConfig => ({
  database: {
    uri: process.env.MONGO_URI
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    refreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION
  }
});
