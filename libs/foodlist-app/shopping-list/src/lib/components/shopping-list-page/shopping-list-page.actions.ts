import { createAction, props } from '@ngrx/store';
import { ShoppingList } from '../../model/shopping-list.model';

export const enteredShoppingListPage = createAction(
  '[Shopping List | Shopping List Page] Entered Shopping List Page'
);

export const clickedOnShoppingList = createAction(
  '[Shopping List | Shopping List Page] Clicked on Shopping List',
  props<{ newShoppingList: ShoppingList }>()
);
