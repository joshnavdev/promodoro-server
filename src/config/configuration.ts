import { IConfig } from './config.interface';

export default (): IConfig => ({
  database: {
    uri: process.env.MONGO_URI
  }
});
