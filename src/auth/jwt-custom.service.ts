import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/models/users/users.schema';
import { jwtConstants } from './constants';
import { TokenType } from './interfaces/constants.interface';
import { IDataPayload } from './interfaces/jwt-payload.interface';
import { TokenSerializer } from './serializers/token.serializers';

@Injectable()
export class JwtCustomService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async getTokens(user: UserDocument): Promise<TokenSerializer> {
    const { email, name, _id: id } = user;

    const data = { email, name };
    const accessToken = await this.generateAccessToken(id, data);
    const refreshToken = await this.generateRefleshToken(id);

    return { accessToken, refreshToken };
  }

  private async generateRefleshToken(id: string): Promise<string> {
    return this.generateToken(id, jwtConstants.refreshType);
  }

  private async generateAccessToken(
    id: string,
    data: IDataPayload
  ): Promise<string> {
    return this.generateToken(id, jwtConstants.accessType, data);
  }

  private async generateToken(
    id: string,
    type: TokenType,
    data?: IDataPayload
  ): Promise<string> {
    const payload = { sub: id, token_type: type, data };

    const expiresIn = this.configService.get<string>(
      `jwt.${type}TokenExpiration`
    );
    return this.jwtService.sign(payload, { expiresIn });
  }
}
