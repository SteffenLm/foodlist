import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let postMock: jest.Mock;

  beforeEach(() => {
    postMock = jest.fn();
    TestBed.configureTestingModule({
      providers: [
        AuthApiService,
        {
          provide: HttpClient,
          useValue: {
            post: postMock,
          },
        },
      ],
    });

    service = TestBed.inject(AuthApiService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('loginUser', () => {
    describe('when the login request ist made', () => {
      beforeEach(() => {
        service.loginUser({ username: 'ToniStark', password: 'Ih4veA<3' });
      });

      it('should call the right endpoint with the payload', () => {
        expect(postMock).toHaveBeenCalledWith('/api/auth/login', {
          username: 'ToniStark',
          password: 'Ih4veA<3',
        });
      });
    });
  });
});
