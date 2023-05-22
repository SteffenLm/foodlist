import { inject } from '@angular/core';
import { LoginComponentActions } from '@foodlist/foodlist-app/login';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';
import { AuthLocalStorageService } from '../services/auth-local-storage.service';
import {
  AuthApiEffectActions,
  AuthLifecycleActions,
  AuthLocalStorageEffectActions,
} from './auth.actions';

export class AuthEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly authApiService = inject(AuthApiService);
  private readonly authLocalStorageService = inject(AuthLocalStorageService);

  public readonly loadDataFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthLifecycleActions.effectInitiated),
      map(() => {
        const token = this.authLocalStorageService.loadToken() ?? null;
        return AuthLocalStorageEffectActions.loadTokenFromLocalStorageSuccess({
          token,
        });
      }),
      catchError(() =>
        of(AuthLocalStorageEffectActions.loadTokenFromLocalStorageFailed())
      )
    )
  );

  public readonly saveTokentoLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiEffectActions.loginSuccess),
        tap(({ token }) => {
          this.authLocalStorageService.saveToken(token);
        })
      ),
    { dispatch: false }
  );

  public readonly loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginComponentActions.submitClicked),
      exhaustMap((action) =>
        this.authApiService.loginUser(action).pipe(
          map((token) => AuthApiEffectActions.loginSuccess(token)),
          catchError(() => of(AuthApiEffectActions.loginFailed()))
        )
      )
    )
  );

  public ngrxOnInitEffects(): Action {
    return AuthLifecycleActions.effectInitiated();
  }
}
