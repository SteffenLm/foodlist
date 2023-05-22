import { ShoppingListsState } from './shopping-lists.reducer';
import * as ShoppingListsSelectors from './shopping-lists.selectors';

describe('ShoppingLists Selectors', () => {
  const stateMock: ShoppingListsState = {
    lists: [
      {
        id: '123',
        name: 'Edeka',
      },
      {
        id: '321',
        name: 'Lidl',
      },
    ],
    isLoading: true,
  };

  it('should select the shopping lists', () => {
    const shoppingLists =
      ShoppingListsSelectors.selectLists.projector(stateMock);

    expect(shoppingLists).toBe(stateMock.lists);
  });

  it('should select the loading information in the state', () => {
    const isLoading =
      ShoppingListsSelectors.selectIsLoading.projector(stateMock);

    expect(isLoading).toBe(stateMock.isLoading);
  });
});
