import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { AuthSignupDTO } from './dtos/auth-sigup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { TokenSerializer } from './serializers/token.serializers';
import { AuthLoginDTO } from './dtos/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
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
    const data = { email, name };
    const payload = { sub: newUser._id, data };

    // Retornar token
    return this.getToken(payload);
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

    const data = { email, name: user.name };
    const payload = { sub: user._id, data };

    return this.getToken(payload);
  }

  private getToken(payload: IJwtPayload): TokenSerializer {
    const token = this.jwtService.sign(payload);
    return { access_token: token, reflesh_token: 'reflesh_token' };
  }
}
