import { AppUser, ShoppingList } from '@foodlist/foodlist-api/typeorm-entities';
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShoppingListRequestValidator } from '../request-validators/create-shopping-list.request-validator';
import { ShoppingListService } from './shopping-list.service';

describe('ShoppingListService', () => {
  let shoppingListRepository: Repository<ShoppingList>;
  let shoppingListService: ShoppingListService;
  beforeEach(async () => {
    const mockShoppingListRepository: Partial<Repository<ShoppingList>> = {
      insert: jest.fn(),
      create: jest.fn().mockReturnValue(new ShoppingList()),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    const mockShoppingListModule: TestingModule =
      await Test.createTestingModule({
        providers: [
          {
            provide: getRepositoryToken(ShoppingList),
            useValue: mockShoppingListRepository,
          },
          ShoppingListService,
        ],
      }).compile();

    shoppingListRepository = mockShoppingListModule.get<
      Repository<ShoppingList>
    >(getRepositoryToken(ShoppingList));
    shoppingListService =
      mockShoppingListModule.get<ShoppingListService>(ShoppingListService);
  });

  it('should be defined', () => {
    expect(shoppingListRepository).toBeDefined();
    expect(shoppingListService).toBeDefined();
  });

  describe('createShoppingList', () => {
    let givenShoppingListDTO: CreateShoppingListRequestValidator;
    let givenCreatorUserId: string;

    beforeEach(() => {
      givenShoppingListDTO = {
        shoppingListName: 'famous fudlist-shop',
      };
      givenCreatorUserId = '1';
    });

    it('should call the insert method with the correct parameter', async () => {
      await shoppingListService.createShoppingList(
        givenShoppingListDTO,
        givenCreatorUserId
      );

      expect(shoppingListRepository.insert).toBeCalledTimes(1);
      expect(shoppingListRepository.insert).toBeCalledWith({
        shoppingListCreator: {
          userId: '1',
        },
        shoppingListName: 'famous fudlist-shop',
      });
    });
  });

  describe('findAllShoppingListsByUserId', () => {
    let givenCreatorUserId: string;

    beforeEach(() => {
      givenCreatorUserId = '1';
    });

    it('should call the find method with the correct parameter', async () => {
      await shoppingListService.findAllShoppingListsByUserId(
        givenCreatorUserId
      );

      expect(shoppingListRepository.find).toBeCalledTimes(1);
      expect(shoppingListRepository.find).toBeCalledWith({
        where: {
          shoppingListCreator: {
            userId: '1',
          },
        },
      });
    });
  });

  describe('findShoppingListById', () => {
    let givenShoppingListId: string;

    beforeEach(() => {
      givenShoppingListId = '1';
    });

    it('should call the find one method with the correct parameter', async () => {
      await shoppingListService.findShoppingListById(givenShoppingListId);

      expect(shoppingListRepository.findOne).toBeCalledTimes(1);
      expect(shoppingListRepository.findOne).toBeCalledWith({
        where: {
          shoppingListId: givenShoppingListId,
        },
        relations: ['shoppingListCreator'],
      });
    });
  });

  describe('userIsAllowedToEditShoppingList', () => {
    let givenShoppingListId: string;
    let givenUserId: string;
    let mockShoppingList: ShoppingList;
    let findShoppingListByIdSpy: jest.SpyInstance;

    beforeEach(() => {
      givenShoppingListId = '1';
      givenUserId = '200';
      mockShoppingList = new ShoppingList();
      mockShoppingList.shoppingListCreator = new AppUser();
      findShoppingListByIdSpy = jest.spyOn(
        shoppingListService,
        'findShoppingListById'
      );
    });

    describe('when user is allowed to edit shopping list', () => {
      it('should return true', async () => {
        mockShoppingList.shoppingListCreator.userId = givenUserId;
        findShoppingListByIdSpy.mockResolvedValue(mockShoppingList);

        const result =
          await shoppingListService.userIsAllowedToEditShoppingList(
            givenShoppingListId,
            givenUserId
          );

        expect(result).toEqual(true);
      });
    });

    describe('when user is not allowed to edit shopping list', () => {
      it('should throw a forbidden exception', async () => {
        mockShoppingList.shoppingListCreator.userId = '500';
        findShoppingListByIdSpy.mockResolvedValue(mockShoppingList);

        const result = shoppingListService.userIsAllowedToEditShoppingList(
          givenShoppingListId,
          givenUserId
        );

        await expect(result).rejects.toThrowError(ForbiddenException);
      });
    });
  });
});
