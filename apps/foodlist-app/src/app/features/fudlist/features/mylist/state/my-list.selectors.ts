import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from './my-list.reducer';
import { MyListState } from './my-list.state';

export const selectMyListState = createFeatureSelector<MyListState>(featureKey);

export const selectShoppingLists = createSelector(
  selectMyListState,
  (listState) => listState.shoppingLists
);

export const selectCurrentShoppingList = createSelector(
  selectShoppingLists,
  getRouterSelectors().selectRouteParams,
  (shoppingLists, { listid }) => {
    if (listid) {
      return shoppingLists[listid];
    } else {
      return {
        name: '',
        items: [],
        shoppingListId: '',
      };
    }
  }
);

export const selectOpenShoppingListItems = createSelector(
  selectCurrentShoppingList,
  (shoppingList) => shoppingList.items.filter((item) => !item.done)
);

export const selectClosedShoppingListItems = createSelector(
  selectCurrentShoppingList,
  (shoppingList) => shoppingList.items.filter((item) => item.done)
);
