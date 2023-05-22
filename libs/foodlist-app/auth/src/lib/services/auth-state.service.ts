import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthenticationFeature } from '../+state/auth.feature';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly store = inject(Store);
  private readonly token$ = this.store.select(
    AuthenticationFeature.selectToken
  );
  protected readonly isInitialized$ = this.store.select(
    AuthenticationFeature.selectInitialized
  );

  public readonly isUserLoggedIn$ = this.isInitialized$.pipe(
    take(1),
    switchMap(() =>
      this.token$.pipe(
        map((token) => !!token && !this.jwtHelper.isTokenExpired(token))
      )
    )
  );
}
