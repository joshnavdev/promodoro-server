import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/commos/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dtos/auth-login.dto';
import { AuthSignupDTO } from './dtos/auth-sigup.dto';
import { TokenSerializer } from './serializers/token.serializers';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serialize(TokenSerializer)
  @Post('signup')
  async signup(@Body() body: AuthSignupDTO): Promise<TokenSerializer> {
    return this.authService.signup(body);
  }

  @Serialize(TokenSerializer)
  @Post('login')
  async login(@Body() body: AuthLoginDTO): Promise<TokenSerializer> {
    return this.authService.login(body);
  }
}
