import { RequestUser } from '@foodlist/foodlist-api/auth';
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipeRequestValidator } from '../request-validators/recipe/create-recipe.request-validator';
import { UpdateRecipeRequestValidator } from '../request-validators/recipe/update-recipe.request-validator';
import { RecipeService } from '../services/recipe.service';
import { RecipeController } from './recipe.controller';

describe('RecipeController', () => {
  let recipeController: RecipeController;
  let recipeService: RecipeService;

  beforeEach(async () => {
    const mockRecipeService: Partial<RecipeService> = {
      createRecipe: jest.fn(),
      findAllRecipesByUserId: jest.fn(),
      findRecipeById: jest.fn(),
      updateRecipeById: jest.fn(),
      userIsAllowedToEditRecipe: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeService,
          useValue: mockRecipeService,
        },
      ],
    }).compile();

    recipeController = module.get<RecipeController>(RecipeController);
    recipeService = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(recipeController).toBeDefined();
    expect(recipeService).toBeDefined();
  });

  describe('createRecipe', () => {
    let givenUser: RequestUser;
    let givenCreateRecipeDTO: CreateRecipeRequestValidator;
    let createRecipeSpy: jest.SpyInstance;

    beforeEach(async () => {
      givenUser = {
        userId: '100',
        username: 'IronMan',
      };
      givenCreateRecipeDTO = {
        recipeName: 'Appleporridge',
        recipeServings: 3,
      };
      createRecipeSpy = jest.spyOn(recipeService, 'createRecipe');
    });

    it('should call the service method with correct parameters', async () => {
      createRecipeSpy.mockResolvedValue(undefined);

      const result = recipeController.createRecipe(
        givenUser,
        givenCreateRecipeDTO
      );

      const expectedCreateRecipeDTO: CreateRecipeRequestValidator = {
        recipeName: 'Appleporridge',
        recipeServings: 3,
      };
      await expect(result).resolves.toBeUndefined();
      expect(createRecipeSpy).toBeCalledTimes(1);
      expect(createRecipeSpy).toBeCalledWith(
        expectedCreateRecipeDTO,
        givenUser.userId
      );
    });
  });

  describe('findAllRecipesByUserId', () => {
    let givenUser: RequestUser;
    let findAllRecipesByUserIdSpy: jest.SpyInstance;

    beforeEach(() => {
      givenUser = {
        userId: '400',
        username: 'IronMan',
      };
      findAllRecipesByUserIdSpy = jest.spyOn(
        recipeService,
        'findAllRecipesByUserId'
      );
    });

    it('should call findAllRecipesByUserId with right parameters', async () => {
      findAllRecipesByUserIdSpy.mockResolvedValue([]);

      await recipeController.findAllRecipesByUserId(givenUser);
      // then
      expect(findAllRecipesByUserIdSpy).toBeCalledTimes(1);
      expect(findAllRecipesByUserIdSpy).toBeCalledWith(givenUser.userId);
    });
  });
  describe('findRecipeById', () => {
    let givenRecipeId: string;
    let givenUser: RequestUser;
    let findRecipeByIdSpy: jest.SpyInstance;
    let userIsAllowedToEditRecipeSpy: jest.SpyInstance;

    beforeEach(() => {
      givenRecipeId = '222';
      givenUser = {
        userId: '400',
        username: 'IronMan',
      };
      findRecipeByIdSpy = jest.spyOn(recipeService, 'findRecipeById');
      userIsAllowedToEditRecipeSpy = jest.spyOn(
        recipeService,
        'userIsAllowedToEditRecipe'
      );
    });

    it('should call findRecipeById with right parameters', async () => {
      findRecipeByIdSpy.mockResolvedValue(undefined);
      const result = recipeController.findRecipeById(givenUser, givenRecipeId);
      await expect(result).resolves.toBeUndefined();
      expect(findRecipeByIdSpy).toBeCalledTimes(1);
      expect(findRecipeByIdSpy).toBeCalledWith(givenRecipeId);
    });
    it('should throw Unauthorized Exception', async () => {
      userIsAllowedToEditRecipeSpy.mockRejectedValue(ForbiddenException);

      const result = recipeController.findRecipeById(givenUser, givenRecipeId);

      await expect(result).rejects.toThrow(ForbiddenException);
      expect(findRecipeByIdSpy).not.toBeCalled();
    });
  });

  describe('updateRecipeById', () => {
    let givenUser: RequestUser;
    let givenRecipeId: string;
    let givenUpdateRecipeDto: UpdateRecipeRequestValidator;
    let userIsAllowedToEditRecipeSpy: jest.SpyInstance;
    let updateRecipeByIdSpy: jest.SpyInstance;

    beforeEach(() => {
      givenUser = {
        userId: '100',
        username: 'Iron Man',
      };
      givenRecipeId = '222';
      givenUpdateRecipeDto = {
        recipeName: 'Penne al Forno',
        recipeServings: 2,
      };
      userIsAllowedToEditRecipeSpy = jest.spyOn(
        recipeService,
        'userIsAllowedToEditRecipe'
      );
      updateRecipeByIdSpy = jest.spyOn(recipeService, 'updateRecipeById');
    });

    it('should call updateRecipeById with right parameters', async () => {
      userIsAllowedToEditRecipeSpy.mockResolvedValue(undefined);
      updateRecipeByIdSpy.mockResolvedValue('');

      const result = recipeController.updateRecipeById(
        givenRecipeId,
        givenUser,
        givenUpdateRecipeDto
      );

      await expect(result).resolves.toBeUndefined();
      expect(updateRecipeByIdSpy).toBeCalledTimes(1);
      expect(updateRecipeByIdSpy).toBeCalledWith(
        givenRecipeId,
        givenUpdateRecipeDto
      );
    });
    it('should throw UnauthorizedException', async () => {
      userIsAllowedToEditRecipeSpy.mockRejectedValue(undefined);

      const result = recipeController.updateRecipeById(
        givenRecipeId,
        givenUser,
        givenUpdateRecipeDto
      );

      await expect(result).rejects.toThrow(ForbiddenException);
      expect(updateRecipeByIdSpy).not.toBeCalled();
    });
  });
});
