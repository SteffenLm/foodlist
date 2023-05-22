import { createReducer, on } from '@ngrx/store';
import * as MyListActions from './my-list.actions';
import { initialState, MyListState } from './my-list.state';

export const featureKey = 'myList';

export const reducer = createReducer(
  initialState,
  on(MyListActions.addShoppingList, (state, action): MyListState => {
    const updatedState = {
      ...state,
      shoppingLists: [
        ...state.shoppingLists,
        {
          shoppingListId: state.shoppingLists.length.toString(),
          name: action.name,
          items: [],
        },
      ],
    };
    return updatedState;
  }),
  on(MyListActions.addShoppingListItem, (state, action): MyListState => {
    const currentShoppingLists = [...state.shoppingLists];
    const affectedShoppingListIndex = currentShoppingLists.findIndex(
      (sl) => sl.shoppingListId === action.listId
    );
    const affectedShoppingList = {
      ...state.shoppingLists[affectedShoppingListIndex],
    };
    affectedShoppingList.items = [...affectedShoppingList.items, action.item];
    currentShoppingLists[affectedShoppingListIndex] = affectedShoppingList;
    const updatedState = {
      ...state,
      shoppingLists: currentShoppingLists,
    };
    return updatedState;
  }),
  on(MyListActions.myListMyListsFailure, (state): MyListState => state),
  on(MyListActions.myListMyListsSuccess, (state): MyListState => state)
);
