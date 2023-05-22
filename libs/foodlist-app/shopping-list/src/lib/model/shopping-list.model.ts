export interface ShoppingList {
  id: string;
  name: string;
}

export const exampleShoppingList = (): ShoppingList => ({
  id: '123',
  name: 'Edeka',
});

export const exampleShoppingLists = (): ShoppingList[] => [
  exampleShoppingList(),
];
