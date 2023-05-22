/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class MyListEffects {
  // loadMyLists$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(MyListActions.myListMyListsFailure),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => MyListActions.myListMyListsSuccess({ data })),
  //         catchError(error => of(MyListActions.myListMyListsFailure({ error }))))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}
}
