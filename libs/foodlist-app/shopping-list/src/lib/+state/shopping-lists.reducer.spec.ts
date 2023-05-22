import { ShoppingList } from '../model/shopping-list.model';
import * as ShoppingListsActions from './../+state/shopping-lists.actions';
import * as fromReducer from './../+state/shopping-lists.reducer';
import * as ShoppingListPageActions from './../components/shopping-list-page/shopping-list-page.actions';

describe('ShoppingListsReducer', () => {
  let state: fromReducer.ShoppingListsState;

  describe('when user enters shopping list page', () => {
    beforeEach(() => {
      const { initialState } = fromReducer;
      const action = ShoppingListPageActions.enteredShoppingListPage();
      state = fromReducer.shoppingListsReducer(initialState, action);
    });
    it('should set the loading indicator to true', () => {
      expect(state.isLoading).toEqual(true);
    });
    it('should return a new reference of the state', () => {
      expect(state).not.toBe(fromReducer.initialState);
    });
  });

  describe('when all shopping lists are loaded successfully', () => {
    beforeEach(() => {
      const { initialState } = fromReducer;
      const newShoppingLists: ShoppingList[] = [
        {
          id: '12345',
          name: 'Aldi',
        },
        {
          id: '56789',
          name: 'Kaufland',
        },
      ];

      const action = ShoppingListsActions.getAllShoppingListsSuccess({
        shoppingLists: newShoppingLists,
      });
      state = fromReducer.shoppingListsReducer(initialState, action);
    });
    it('should set loading indicator to false', () => {
      expect(state.isLoading).toEqual(false);
    });
    it('should replace the old lists with the new lists', () => {
      expect(state.lists.length).toEqual(2);
      expect(state.lists[0].id).toEqual('12345');
    });
    it('should return a new reference of the state', () => {
      expect(state).not.toBe(fromReducer.initialState);
    });
  });
});
