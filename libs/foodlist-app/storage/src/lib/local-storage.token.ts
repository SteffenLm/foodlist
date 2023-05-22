import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<typeof localStorage>(
  'LOCAL_STORAGE'
);

export const LOCAL_STORAGE_KEY = new InjectionToken<string>(
  'LOCAL_STORAGE_KEY'
);
