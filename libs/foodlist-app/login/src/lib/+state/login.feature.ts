import { createFeature, createReducer } from '@ngrx/store';

interface LoginState {
  error: string | null;
}

export const getInitialLoginState = (): LoginState => ({
  error: null,
});

export const loginFeature = createFeature({
  name: 'login',
  reducer: createReducer(getInitialLoginState()),
});
