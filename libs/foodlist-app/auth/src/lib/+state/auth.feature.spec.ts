import { Action } from '@ngrx/store';
import {
  AuthApiEffectActions,
  AuthLocalStorageEffectActions,
} from './auth.actions';
import {
  AuthenticationFeature,
  AuthenticationState,
  getInitialAuthState,
} from './auth.feature';

describe('AuthFeature', () => {
  describe('reducer', () => {
    let newState: AuthenticationState;
    const testActionOnReducer = (
      action: Action,
      state: AuthenticationState = getInitialAuthState()
    ) => {
      newState = AuthenticationFeature.reducer(state, action);
    };

    describe('when a user logged in successfully', () => {
      beforeEach(() => {
        testActionOnReducer(
          AuthApiEffectActions.loginSuccess({ token: 'test_token' })
        );
      });

      it('should set the token', () => {
        expect(newState.token).toEqual('test_token');
      });

      it('should reset the error', () => {
        expect(newState.error).toBeNull();
      });
    });

    describe('when a user login failed', () => {
      beforeEach(() => {
        testActionOnReducer(AuthApiEffectActions.loginFailed());
      });

      it('should set the token to null', () => {
        expect(newState.token).toBeNull();
      });

      it('should set the error to "Login Failed"', () => {
        expect(newState.error).toEqual('Login Failed');
      });
    });

    describe('when the token has been loaded from the local storage', () => {
      beforeEach(() => {
        testActionOnReducer(
          AuthLocalStorageEffectActions.loadTokenFromLocalStorageSuccess({
            token: 'test_token',
          })
        );
      });

      it('should set the token to the loaded value', () => {
        expect(newState.token).toEqual('test_token');
      });

      it('should set initialized to true', () => {
        expect(newState.initialized).toBeTruthy();
      });
    });

    describe('when loading the token from the local storage failed', () => {
      beforeEach(() => {
        testActionOnReducer(
          AuthLocalStorageEffectActions.loadTokenFromLocalStorageFailed()
        );
      });

      it('should set the token to null', () => {
        expect(newState.token).toBeNull();
      });

      it('should set initialized to true', () => {
        expect(newState.initialized).toBeTruthy();
      });
    });
  });
  describe('extraSelectors', () => {
    describe('isTokenSet', () => {
      describe('when a token ist set', () => {
        it('should return true', () => {
          const result =
            AuthenticationFeature.isTokenSet.projector('token_test');
          expect(result).toBeTruthy();
        });
      });
      describe('when a token ist not set', () => {
        it('should return false', () => {
          const result = AuthenticationFeature.isTokenSet.projector('');
          expect(result).toBeFalsy();
        });
      });
    });
  });
});
