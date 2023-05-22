import { RequestUser } from '@foodlist/foodlist-api/auth';
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateShoppingListRequestValidator } from '../request-validators/create-shopping-list.request-validator';
import { ShoppingListService } from '../services/shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';

describe('ShoppingListController', () => {
  let shoppingListController: ShoppingListController;
  let shoppingListService: ShoppingListService;

  beforeEach(async () => {
    const mockShoppingListService: Partial<ShoppingListService> = {
      createShoppingList: jest.fn(),
      findAllShoppingListsByUserId: jest.fn(),
      userIsAllowedToEditShoppingList: jest.fn(),
      findShoppingListById: jest.fn(),
    };
    const mockShoppingListModule: TestingModule =
      await Test.createTestingModule({
        controllers: [ShoppingListController],
        providers: [
          {
            provide: ShoppingListService,
            useValue: mockShoppingListService,
          },
        ],
      }).compile();

    shoppingListController = mockShoppingListModule.get<ShoppingListController>(
      ShoppingListController
    );
    shoppingListService =
      mockShoppingListModule.get<ShoppingListService>(ShoppingListService);
  });

  it('should be defined', () => {
    expect(shoppingListController).toBeDefined();
    expect(shoppingListService).toBeDefined();
  });

  describe('createShoppingList', () => {
    let givenUser: RequestUser;
    let givenCreateShoppingListDTO: CreateShoppingListRequestValidator;
    let createShoppingListSpy: jest.SpyInstance;

    beforeEach(async () => {
      givenUser = {
        userId: '3',
        username: 'lamaglio',
      };
      givenCreateShoppingListDTO = {
        shoppingListName: 'mein famoser Einkaufsladen',
      };
      createShoppingListSpy = jest.spyOn(
        shoppingListService,
        'createShoppingList'
      );
    });

    it('should call the create shopping list method from the service with the correct parameters', async () => {
      createShoppingListSpy.mockResolvedValue(undefined);

      const result = shoppingListController.createShoppingList(
        givenUser,
        givenCreateShoppingListDTO
      );

      await expect(result).resolves.toBeUndefined();
      expect(createShoppingListSpy).toBeCalledTimes(1);
      expect(createShoppingListSpy).toBeCalledWith(
        givenCreateShoppingListDTO,
        givenUser.userId
      );
    });
  });

  describe('findAllShoppingListsByUserId', () => {
    let givenUser: RequestUser;
    let findAllShoppingListsByUserIdSpy: jest.SpyInstance;

    beforeEach(() => {
      givenUser = {
        userId: '3',
        username: 'lamaglio',
      };
      findAllShoppingListsByUserIdSpy = jest.spyOn(
        shoppingListService,
        'findAllShoppingListsByUserId'
      );
    });

    it('should call the find all shopping lists by user id service method with the correct parameter', async () => {
      findAllShoppingListsByUserIdSpy.mockResolvedValue(undefined);

      const result =
        shoppingListController.findAllShoppingListsByUserId(givenUser);

      await expect(result).resolves.toBeUndefined();
      expect(findAllShoppingListsByUserIdSpy).toBeCalledTimes(1);
      expect(findAllShoppingListsByUserIdSpy).toBeCalledWith(givenUser.userId);
    });
  });

  describe('findShoppingListById', () => {
    let givenUser: RequestUser;
    let givenShoppingListId: string;
    let findShoppingListByIdSpy: jest.SpyInstance;
    let userIsAllowedToEditShoppingListSpy: jest.SpyInstance;

    beforeEach(() => {
      givenUser = {
        userId: '3',
        username: 'lamaglio',
      };
      givenShoppingListId = '1';
      findShoppingListByIdSpy = jest.spyOn(
        shoppingListService,
        'findShoppingListById'
      );
      userIsAllowedToEditShoppingListSpy = jest.spyOn(
        shoppingListService,
        'userIsAllowedToEditShoppingList'
      );
    });

    describe('when user is allowed to get the shopping list', () => {
      it('should call the find shopping list by id service method with the correct parameters', async () => {
        userIsAllowedToEditShoppingListSpy.mockResolvedValue(undefined);
        findShoppingListByIdSpy.mockResolvedValue(true);

        const result = shoppingListController.findShoppingListById(
          givenUser,
          givenShoppingListId
        );

        await expect(result).resolves.toEqual(true);
        expect(findShoppingListByIdSpy).toBeCalledTimes(1);
        expect(findShoppingListByIdSpy).toBeCalledWith(givenShoppingListId);
      });
    });

    describe('when user is not allowed to get the shopping list', () => {
      it('should throw a forbidden exception', async () => {
        userIsAllowedToEditShoppingListSpy.mockRejectedValue(
          ForbiddenException
        );

        const result = shoppingListController.findShoppingListById(
          givenUser,
          givenShoppingListId
        );

        await expect(result).rejects.toThrow(ForbiddenException);
        expect(findShoppingListByIdSpy).not.toBeCalled();
      });
    });
  });
});
