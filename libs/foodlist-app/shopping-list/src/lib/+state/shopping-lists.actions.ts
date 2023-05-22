import { createAction, props } from '@ngrx/store';
import { ShoppingList } from '../model/shopping-list.model';

export const getAllShoppingListsSuccess = createAction(
  '[Shopping List | Shopping Lists API] Get All Shopping Lists Success',
  props<{ shoppingLists: ShoppingList[] }>()
);

export const getAllShoppingListsFailure = createAction(
  '[Shopping List | Shopping Lists API] Get All Shopping Lists Failure'
);
