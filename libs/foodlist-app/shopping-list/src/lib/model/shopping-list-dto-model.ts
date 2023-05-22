export interface ShoppingListDto {
  shoppingListId: string;
  shoppingListName: string;
}

export const exampleShoppingListDTO = (): ShoppingListDto => ({
  shoppingListId: '123',
  shoppingListName: 'Edeka',
});

export const exampleShoppingListsDTO = (): ShoppingListDto[] => [
  exampleShoppingListDTO(),
];
