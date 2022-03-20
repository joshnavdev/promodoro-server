import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CreateUserDto from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Post('signup')
  signup(@Body() body: CreateUserDto): any {
    return 'hi there!';
  }
}
