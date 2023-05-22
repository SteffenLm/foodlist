import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthApiEffectActions = createActionGroup({
  source: 'Authentication | API',
  events: {
    'Login Success': props<{ token: string }>(),
    'Login Failed': emptyProps(),
  },
});

export const AuthLocalStorageEffectActions = createActionGroup({
  source: 'Authentication | Local Storage',
  events: {
    'Load Token From Local Storage Success': props<{ token: string | null }>(),
    'Load Token From Local Storage Failed': emptyProps(),
  },
});

export const AuthLifecycleActions = createActionGroup({
  source: 'Authentication | Lifecycle',
  events: {
    'Effect Initiated': emptyProps(),
  },
});
