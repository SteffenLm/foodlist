import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiEffectActions } from '@foodlist/foodlist-app/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createActionGroup, emptyProps } from '@ngrx/store';
import { exhaustMap, filter, from, map } from 'rxjs';

export const AppRoutingEffectActions = createActionGroup({
  source: 'Application | Routing Effects',
  events: {
    'Navigation to Start Page Succeeded': emptyProps(),
    'Navigation to Start Page Failed': emptyProps(),
  },
});

@Injectable()
export class RoutingEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);

  navigateToStartPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiEffectActions.loginSuccess),
      filter(({ token }) => !!token),
      exhaustMap(() =>
        from(this.navigateToStartPage()).pipe(
          map((navigationSuccess) =>
            navigationSuccess
              ? AppRoutingEffectActions.navigationToStartPageSucceeded()
              : AppRoutingEffectActions.navigationToStartPageFailed()
          )
        )
      )
    )
  );

  private navigateToStartPage() {
    return this.router.navigate(['fudlist']);
  }
}
