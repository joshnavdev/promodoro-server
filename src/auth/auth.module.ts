import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IJwtConfig } from 'src/config/config.interface';
import { UsersModule } from 'src/models/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtCustomService } from './jwt-custom.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configServise: ConfigService) => {
        const jwtConfig = configServise.get<IJwtConfig>('jwt');

        return {
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: jwtConfig.accessTokenExpiration
          }
        };
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtCustomService]
})
export class AuthModule {}
