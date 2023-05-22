import { createReducer, on } from '@ngrx/store';
import { ShoppingList } from '../model/shopping-list.model';
import * as ShoppingListPageActions from './../components/shopping-list-page/shopping-list-page.actions';
import * as ShoppingListActions from './shopping-lists.actions';

export const SHOPPING_LISTS_FEATURE_KEY = 'shoppingLists';

export interface ShoppingListsState {
  lists: ShoppingList[];
  isLoading: boolean;
}

export interface ShoppingListsPartialState {
  readonly [SHOPPING_LISTS_FEATURE_KEY]: ShoppingListsState;
}

export const initialState: ShoppingListsState = {
  lists: [
    {
      id: '123',
      name: 'Edeka',
    },
  ],
  isLoading: false,
};

export const shoppingListsReducer = createReducer(
  initialState,
  on(
    ShoppingListPageActions.enteredShoppingListPage,
    (state): ShoppingListsState => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    ShoppingListActions.getAllShoppingListsSuccess,
    (state, action): ShoppingListsState => {
      return {
        lists: action.shoppingLists,
        isLoading: false,
      };
    }
  )
);
