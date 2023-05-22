import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import {
  AuthApiEffectActions,
  AuthLocalStorageEffectActions,
} from './auth.actions';

export interface AuthenticationState {
  token: string | null;
  error: string | null;
  initialized: boolean;
}

export const getInitialAuthState = (): AuthenticationState => ({
  token: null,
  error: null,
  initialized: false,
});

export const AuthenticationFeature = createFeature({
  name: 'authentication',
  reducer: createReducer(
    getInitialAuthState(),
    on(AuthApiEffectActions.loginSuccess, (state, { token }) => ({
      ...state,
      token,
      error: null,
    })),
    on(AuthApiEffectActions.loginFailed, (state) => ({
      ...state,
      token: null,
      error: 'Login Failed',
    })),
    on(
      AuthLocalStorageEffectActions.loadTokenFromLocalStorageSuccess,
      (state, { token }) => ({
        ...state,
        token,
        initialized: true,
      })
    ),
    on(
      AuthLocalStorageEffectActions.loadTokenFromLocalStorageFailed,
      (state) => ({
        ...state,
        token: null,
        initialized: true,
      })
    )
  ),
  extraSelectors: ({ selectToken }) => ({
    isTokenSet: createSelector(selectToken, (token) => !!token),
  }),
});
