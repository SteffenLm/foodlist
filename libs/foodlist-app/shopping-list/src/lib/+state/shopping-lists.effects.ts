import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as ShoppingListPageActions from '../components/shopping-list-page/shopping-list-page.actions';
import { ShoppingList } from '../model/shopping-list.model';
import { ShoppingListHttpService } from '../services/shopping-list-http.service';
import {
  getAllShoppingListsFailure,
  getAllShoppingListsSuccess,
} from './shopping-lists.actions';

@Injectable()
export class ShoppingListsEffects {
  getShoppingLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListPageActions.enteredShoppingListPage),
      switchMap(() =>
        this.shoppingListHttpService.getAllShoppingLists().pipe(
          map((shoppingListDTOs): ShoppingList[] => {
            return shoppingListDTOs.map((shoppingListDto): ShoppingList => {
              return {
                id: shoppingListDto.shoppingListId,
                name: shoppingListDto.shoppingListName,
              };
            });
          }),
          map((shoppingLists) => getAllShoppingListsSuccess({ shoppingLists })),
          catchError(() => of(getAllShoppingListsFailure()))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly shoppingListHttpService: ShoppingListHttpService
  ) {}
}
