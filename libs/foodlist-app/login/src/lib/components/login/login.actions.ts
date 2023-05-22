import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginFormValue } from './login.form';

export const LoginComponentActions = createActionGroup({
  source: 'Login | Login Component',
  events: {
    'Register Clicked': emptyProps(),
    'Submit Clicked': props<LoginFormValue>(),
  },
});
