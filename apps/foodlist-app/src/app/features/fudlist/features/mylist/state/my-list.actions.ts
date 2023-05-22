import { createAction, props } from '@ngrx/store';
import { IShoppingListItem } from '../models/shopping-list.model';

export const addShoppingList = createAction(
  '[MyList] Add Shopping List',
  props<{ name: string }>()
);

export const addShoppingListItem = createAction(
  '[MyList] Add Shopping List Item',
  props<{ item: IShoppingListItem; listId: string }>()
);

export const myListMyListsSuccess = createAction(
  '[MyList] MyList MyLists Success'
);

export const myListMyListsFailure = createAction(
  '[MyList] MyList MyLists Failure'
);
