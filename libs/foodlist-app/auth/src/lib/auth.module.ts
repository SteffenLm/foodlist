import { inject, NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { LOCAL_STORAGE_KEY } from '@foodlist/foodlist-app/storage';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AuthEffects } from './+state/auth.effects';
import { AuthenticationFeature } from './+state/auth.feature';
import { AuthLocalStorageService } from './services/auth-local-storage.service';

@NgModule({
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () =>
          firstValueFrom(
            inject(Store).select(AuthenticationFeature.selectToken)
          ),
      },
    }),
    StoreModule.forFeature(AuthenticationFeature),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthLocalStorageService,
    { provide: LOCAL_STORAGE_KEY, useValue: 'token' },
  ],
})
export class AuthModule {}
