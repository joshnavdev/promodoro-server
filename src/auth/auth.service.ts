import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { AuthSignupDTO } from './dtos/auth-sigup.dto';
import * as bcrypt from 'bcrypt';
import { TokenSerializer } from './serializers/token.serializers';
import { AuthLoginDTO } from './dtos/auth-login.dto';
import { JwtCustomService } from './jwt-custom.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtCustomService: JwtCustomService
  ) {}

  async signup(authSignupCredential: AuthSignupDTO): Promise<TokenSerializer> {
    // Validar si el correo existe
    const { email, password, name } = authSignupCredential;
    const user = await this.usersService.findOne(email);

    if (user) {
      throw new BadRequestException('Email has already used');
    }
    // Hashear password con bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // Guardar usuario
    const newUserData = { email, name, password: hashedPassword };
    const newUser = await this.usersService.create(newUserData);
    // Generar Token
    // Retornar token
    return this.jwtCustomService.getTokens(newUser);
  }

  async login(authLoginCredential: AuthLoginDTO): Promise<TokenSerializer> {
    const { email, password } = authLoginCredential;
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new BadRequestException('Email not exists');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    return this.jwtCustomService.getTokens(user);
  }
}
