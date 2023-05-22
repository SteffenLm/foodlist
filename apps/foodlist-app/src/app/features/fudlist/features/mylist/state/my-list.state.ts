import { IShoppingList } from '../models/shopping-list.model';

export interface MyListState {
  shoppingLists: IShoppingList[];
}

export const initialState: MyListState = {
  shoppingLists: [
    {
      shoppingListId: '0',
      name: 'Lidl',
      items: [],
    },
    {
      shoppingListId: '1',
      name: 'Markt',
      items: [],
    },
  ],
};
