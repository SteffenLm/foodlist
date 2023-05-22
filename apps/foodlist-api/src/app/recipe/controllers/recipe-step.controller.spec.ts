import { RequestUser } from '@foodlist/foodlist-api/auth';
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipeStepRequestValidator } from '../request-validators/recipe-step/create-recipe-step.request-validator';
import { UpdateRecipeStepRequestValidator } from '../request-validators/recipe-step/update-recipe-step.request-validator';
import { RecipeStepService } from '../services/recipe-step.service';
import { RecipeService } from '../services/recipe.service';
import { RecipeStepController } from './recipe-step.controller';

describe('RecipeStepController', () => {
  let recipeStepController: RecipeStepController;
  let recipeStepService: RecipeStepService;
  let recipeService: RecipeService;

  beforeEach(async () => {
    const mockRecipeStepService: Partial<RecipeStepService> = {
      addStepToRecipe: jest.fn(),
      deleteRecipeStepById: jest.fn(),
      updateRecipeStepById: jest.fn(),
      findAllStepsByRecipeId: jest.fn(),
    };
    const mockRecipeService: Partial<RecipeService> = {
      userIsAllowedToEditRecipe: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeStepController],
      providers: [
        {
          provide: RecipeStepService,
          useValue: mockRecipeStepService,
        },
        {
          provide: RecipeService,
          useValue: mockRecipeService,
        },
      ],
    }).compile();

    recipeStepController =
      module.get<RecipeStepController>(RecipeStepController);
    recipeStepService = module.get<RecipeStepService>(RecipeStepService);
    recipeService = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(recipeStepController).toBeDefined();
    expect(recipeStepService).toBeDefined();
    expect(recipeService).toBeDefined();
  });

  describe('addStepToRecipe', () => {
    let givenRecipeId: string;
    let givenCreateRecipeStepDTO: CreateRecipeStepRequestValidator;
    let givenUser: RequestUser;
    let addStepToRecipeSpy: jest.SpyInstance;
    let userIsAllowedToEditRecipeSpy: jest.SpyInstance;

    beforeEach(() => {
      givenRecipeId = '152';
      givenCreateRecipeStepDTO = {
        stepInstruction: 'Add Apple to Dish',
        stepNumber: 2,
      };
      givenUser = {
        userId: '100',
        username: 'IronMan',
      };
      addStepToRecipeSpy = jest.spyOn(recipeStepService, 'addStepToRecipe');
      userIsAllowedToEditRecipeSpy = jest.spyOn(
        recipeService,
        'userIsAllowedToEditRecipe'
      );
    });

    it('should call the addSubstanceToRecipe with correct parameters', async () => {
      userIsAllowedToEditRecipeSpy.mockResolvedValue(true);

      const result = recipeStepController.addStepToRecipe(
        givenUser,
        givenRecipeId,
        givenCreateRecipeStepDTO
      );

      const expecCreateRecipeStepDTO: CreateRecipeStepRequestValidator = {
        stepInstruction: 'Add Apple to Dish',
        stepNumber: 2,
      };
      await expect(result).resolves.toBeUndefined();
      expect(addStepToRecipeSpy).toBeCalledTimes(1);
      expect(addStepToRecipeSpy).toBeCalledWith(
        givenRecipeId,
        expecCreateRecipeStepDTO
      );
    });

    it('should throw unauthorized exception', async () => {
      userIsAllowedToEditRecipeSpy.mockRejectedValue(new Error());

      const result = recipeStepController.addStepToRecipe(
        givenUser,
        givenRecipeId,
        givenCreateRecipeStepDTO
      );

      await expect(result).rejects.toThrowError(ForbiddenException);
      expect(addStepToRecipeSpy).toBeCalledTimes(0);
    });
  });

  describe('findAllStepsByRecipeId', () => {
    let givenRecipeId: string;
    let givenUser: RequestUser;
    let userIsAllowedToEditRecipe: jest.SpyInstance;
    let findAllStepsByRecipeIdSpy: jest.SpyInstance;

    beforeEach(async () => {
      givenRecipeId = '152';
      givenUser = {
        userId: '100',
        username: 'IronMan',
      };
      userIsAllowedToEditRecipe = jest.spyOn(
        recipeService,
        'userIsAllowedToEditRecipe'
      );
      findAllStepsByRecipeIdSpy = jest.spyOn(
        recipeStepService,
        'findAllStepsByRecipeId'
      );
    });

    it('should call the findAllStepsByRecipeId with correct parameters', async () => {
      userIsAllowedToEditRecipe.mockResolvedValue(true);
      findAllStepsByRecipeIdSpy.mockResolvedValue([]);

      const result = recipeStepController.findAllStepsByRecipeId(
        givenUser,
        givenRecipeId
      );

      await expect(result).resolves.toEqual([]);
      expect(findAllStepsByRecipeIdSpy).toBeCalledTimes(1);
      expect(findAllStepsByRecipeIdSpy).toBeCalledWith(givenRecipeId);
    });

    it('should throw forbidden exception', async () => {
      userIsAllowedToEditRecipe.mockRejectedValue(new Error());

      const result = recipeStepController.findAllStepsByRecipeId(
        givenUser,
        givenRecipeId
      );

      await expect(result).rejects.toThrowError(ForbiddenException);
      expect(findAllStepsByRecipeIdSpy).toBeCalledTimes(0);
    });
  });

  describe('updateSubstanceOfRecipeById', () => {
    let givenRecipeId: string;
    let givenStepId: string;
    let givenUser: RequestUser;
    let givenUpdateRecipeStepDto: UpdateRecipeStepRequestValidator;
    let userIsAllowedToEditRecipe: jest.SpyInstance;
    let updateRecipeStepByIdSpy: jest.SpyInstance;

    beforeEach(async () => {
      givenRecipeId = '152';
      givenStepId = '12';
      givenUser = {
        userId: '100',
        username: 'IronMan',
      };
      givenUpdateRecipeStepDto = {
        stepInstruction: 'Add Apple to Dish.',
        stepNumber: 2,
      };
      userIsAllowedToEditRecipe = jest.spyOn(
        recipeService,
        'userIsAllowedToEditRecipe'
      );
      updateRecipeStepByIdSpy = jest.spyOn(
        recipeStepService,
        'updateRecipeStepById'
      );
    });

    it('should call updateRecipeStepById with correct parameters', async () => {
      userIsAllowedToEditRecipe.mockResolvedValue(true);
      updateRecipeStepByIdSpy.mockResolvedValue(undefined);

      const result = recipeStepController.updateStepOfRecipeByRecipeStepId(
        givenUser,
        givenRecipeId,
        givenStepId,
        givenUpdateRecipeStepDto
      );

      await expect(result).resolves.toBeUndefined();
      expect(updateRecipeStepByIdSpy).toBeCalledTimes(1);
      expect(updateRecipeStepByIdSpy).toBeCalledWith(
        givenStepId,
        givenUpdateRecipeStepDto
      );
    });

    it('should throw forbidden exception', async () => {
      userIsAllowedToEditRecipe.mockRejectedValue(new Error());

      const result = recipeStepController.updateStepOfRecipeByRecipeStepId(
        givenUser,
        givenRecipeId,
        givenStepId,
        givenUpdateRecipeStepDto
      );

      await expect(result).rejects.toThrowError(ForbiddenException);
      expect(updateRecipeStepByIdSpy).toBeCalledTimes(0);
    });
  });

  describe('deleteRecipeStepById', () => {
    let givenRecipeId: string;
    let givenStepId: string;
    let givenUser: RequestUser;
    let userIsAllowedToEditRecipeSpy: jest.SpyInstance;
    let deleteRecipeStepByIdSpy: jest.SpyInstance;

    beforeEach(async () => {
      givenRecipeId = '152';
      givenStepId = '12';
      givenUser = {
        userId: '100',
        username: 'IronMan',
      };
      userIsAllowedToEditRecipeSpy = jest.spyOn(
        recipeService,
        'userIsAllowedToEditRecipe'
      );
      deleteRecipeStepByIdSpy = jest.spyOn(
        recipeStepService,
        'deleteRecipeStepById'
      );
    });

    it('should call deleteRecipeStepById with correct parameters', async () => {
      userIsAllowedToEditRecipeSpy.mockResolvedValue(true);
      deleteRecipeStepByIdSpy.mockResolvedValue(undefined);

      const result = recipeStepController.deleteRecipeStepById(
        givenUser,
        givenRecipeId,
        givenStepId
      );
      await expect(result).resolves.toBeUndefined();
      expect(deleteRecipeStepByIdSpy).toBeCalledTimes(1);
      expect(deleteRecipeStepByIdSpy).toBeCalledWith(givenStepId);
    });

    it('should throw forbidden exception', async () => {
      userIsAllowedToEditRecipeSpy.mockRejectedValue(new Error());

      const result = recipeStepController.deleteRecipeStepById(
        givenUser,
        givenRecipeId,
        givenStepId
      );
      await expect(result).rejects.toThrowError(ForbiddenException);
      expect(deleteRecipeStepByIdSpy).toBeCalledTimes(0);
    });
  });
});
