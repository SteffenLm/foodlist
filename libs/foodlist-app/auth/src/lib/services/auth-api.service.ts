import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

type LoginRequestDto = {
  username: string;
  password: string;
};

type LoginResponseDto = {
  token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly httpClient = inject(HttpClient);

  public loginUser(loginRequestDto: LoginRequestDto) {
    return this.httpClient.post<LoginResponseDto>(
      '/api/auth/login',
      loginRequestDto
    );
  }
}
