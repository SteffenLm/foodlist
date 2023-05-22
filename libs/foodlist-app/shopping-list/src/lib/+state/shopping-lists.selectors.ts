import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingList } from '../model/shopping-list.model';
import {
  ShoppingListsState,
  SHOPPING_LISTS_FEATURE_KEY,
} from './shopping-lists.reducer';

const selectShoppingListsFeatureSlice =
  createFeatureSelector<ShoppingListsState>(SHOPPING_LISTS_FEATURE_KEY);

export const selectLists = createSelector(
  selectShoppingListsFeatureSlice,
  (shoppingListState): ShoppingList[] => shoppingListState.lists
);

export const selectIsLoading = createSelector(
  selectShoppingListsFeatureSlice,
  (shoppingListState): boolean => shoppingListState.isLoading
);
