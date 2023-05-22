import { PrivacyAppUserService } from '@foodlist/foodlist-api/app-users';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private privacyAppUserService: PrivacyAppUserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.privacyAppUserService.findAppUserByUsername(
      username
    );
    if (user && user.password === password) {
      const result = {
        username: user.username,
        userId: user.userId,
      };
      return result;
    }
    return null;
  }

  async login(user: {
    userId: string;
    username: string;
  }): Promise<AuthResponse> {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
