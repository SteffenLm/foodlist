import { TestBed } from '@angular/core/testing';
import { LoginComponentActions } from '@foodlist/foodlist-app/login';
import { provideMockActions } from '@ngrx/effects/testing';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';
import { AuthLocalStorageService } from '../services/auth-local-storage.service';
import {
  AuthApiEffectActions,
  AuthLifecycleActions,
  AuthLocalStorageEffectActions,
} from './auth.actions';

import { Action } from '@ngrx/store';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;

  const authApiServiceMock = {
    loginUser: jest.fn(),
  };

  const authLocalStorageServiceMock = {
    loadToken: jest.fn(),
    saveToken: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthApiService,
          useValue: authApiServiceMock,
        },
        {
          provide: AuthLocalStorageService,
          useValue: authLocalStorageServiceMock,
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('when the effect has been initalized', () => {
    beforeEach(() => {
      actions$ = of(AuthLifecycleActions.effectInitiated());
    });
    describe('and a valid token is loaded from local storage', () => {
      beforeEach(() => {
        authLocalStorageServiceMock.loadToken.mockReturnValue('test_token');
      });

      it('should dispatch the success action', async () => {
        const resultAction = await firstValueFrom(
          effects.loadDataFromLocalStorage$
        );
        expect(resultAction).toEqual(
          AuthLocalStorageEffectActions.loadTokenFromLocalStorageSuccess({
            token: 'test_token',
          })
        );
      });
    });

    describe('and a invalid token is loaded from local storage', () => {
      beforeEach(() => {
        authLocalStorageServiceMock.loadToken.mockReturnValue(undefined);
      });

      it('should dispatch the success action with a null value', async () => {
        const resultAction = await firstValueFrom(
          effects.loadDataFromLocalStorage$
        );
        expect(resultAction).toEqual(
          AuthLocalStorageEffectActions.loadTokenFromLocalStorageSuccess({
            token: null,
          })
        );
      });
    });

    describe('and an error occurs while loading from local storage', () => {
      beforeEach(() => {
        authLocalStorageServiceMock.loadToken.mockImplementation(() => {
          throw new Error();
        });
      });

      it('should dispatch the error action', async () => {
        const resultAction = await firstValueFrom(
          effects.loadDataFromLocalStorage$
        );
        expect(resultAction).toEqual(
          AuthLocalStorageEffectActions.loadTokenFromLocalStorageFailed()
        );
      });
    });
  });

  describe('when a user logged in successfully', () => {
    beforeEach(() => {
      actions$ = of(AuthApiEffectActions.loginSuccess({ token: 'test_token' }));
    });

    it('should save the token in the local storage', async () => {
      await firstValueFrom(effects.saveTokentoLocalStorage$);
      expect(authLocalStorageServiceMock.saveToken).toHaveBeenCalledWith(
        'test_token'
      );
    });
  });

  describe('when a user clicked on the login button', () => {
    beforeEach(() => {
      actions$ = of(
        LoginComponentActions.submitClicked({
          username: 'ToniStark',
          password: 'IhaveA<3',
        })
      );
    });

    describe('and the credentials were correct', () => {
      beforeEach(() => {
        authApiServiceMock.loginUser.mockReturnValue(
          of({ token: 'test_token' })
        );
      });

      it('should dispatch a success action', async () => {
        const resultAction = await firstValueFrom(effects.loginUser$);
        expect(resultAction).toEqual(
          AuthApiEffectActions.loginSuccess({ token: 'test_token' })
        );
      });
    });

    describe('and the credentials were incorrect', () => {
      beforeEach(() => {
        authApiServiceMock.loginUser.mockReturnValue(
          throwError(() => new Error())
        );
      });

      it('should dispatch an error action', async () => {
        const resultAction = await firstValueFrom(effects.loginUser$);
        expect(resultAction).toEqual(AuthApiEffectActions.loginFailed());
      });
    });
  });
});
