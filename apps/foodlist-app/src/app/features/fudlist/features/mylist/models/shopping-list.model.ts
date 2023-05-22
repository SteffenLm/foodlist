export interface IShoppingList {
  shoppingListId: string;
  name: string;
  items: IShoppingListItem[];
}

export interface IShoppingListItem {
  done: boolean;
  getItemText: () => string;
}
