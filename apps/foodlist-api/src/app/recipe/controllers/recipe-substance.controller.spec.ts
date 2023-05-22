import { RequestUser } from '@foodlist/foodlist-api/auth';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipeSubstanceRequestValidator } from '../request-validators/recipe-substance/create-recipe-substance.request-validator';
import { UpdateRecipeSubstanceRequestValidator } from '../request-validators/recipe-substance/update-recipe-substance.request-validator';
import { RecipeSubstanceService } from '../services/recipe-substance.service';
import { RecipeService } from '../services/recipe.service';
import { RecipeSubstanceController } from './recipe-substance.controller';

describe('RecipeSubstanceController', () => {
  let recipeSubstanceController: RecipeSubstanceController;
  let recipeSubstanceService: RecipeSubstanceService;
  let recipeService: RecipeService;
  let userIsAllowedToEditRecipeSpy: jest.SpyInstance;

  beforeEach(async () => {
    const mockRecipeSubstanceService: Partial<RecipeSubstanceService> = {
      addSubstanceToRecipe: jest.fn(),
      findAllSubstancesByRecipeId: jest.fn(),
      updateSubstanceOfRecipeById: jest.fn(),
      deleteSubstanceFromRecipe: jest.fn(),
    };
    const mockRecipeService: Partial<RecipeService> = {
      userIsAllowedToEditRecipe: jest.fn(),
    };
    userIsAllowedToEditRecipeSpy = jest.spyOn(
      mockRecipeService,
      'userIsAllowedToEditRecipe'
    );
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeSubstanceController],
      providers: [
        {
          provide: RecipeSubstanceService,
          useValue: mockRecipeSubstanceService,
        },
        {
          provide: RecipeService,
          useValue: mockRecipeService,
        },
      ],
    }).compile();

    recipeSubstanceController = module.get<RecipeSubstanceController>(
      RecipeSubstanceController
    );
    recipeSubstanceService = module.get<RecipeSubstanceService>(
      RecipeSubstanceService
    );
    recipeService = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(recipeSubstanceController).toBeDefined();
    expect(recipeSubstanceService).toBeDefined();
    expect(recipeService).toBeDefined();
  });

  describe('addSubstanceToRecipe', () => {
    let givenUser: RequestUser;
    let givenRecipeId: string;
    let givenCreateRecipeSubstanceDTO: CreateRecipeSubstanceRequestValidator;
    let addSubstanceToRecipeSpy: jest.SpyInstance;

    beforeEach(() => {
      givenUser = {
        userId: '100',
        username: 'IronMan',
      };
      givenRecipeId = '100';
      givenCreateRecipeSubstanceDTO = {
        substanceId: '245',
        substanceAmount: 300,
        substanceUnit: '2',
      };
      userIsAllowedToEditRecipeSpy.mockReset();
      addSubstanceToRecipeSpy = jest.spyOn(
        recipeSubstanceService,
        'addSubstanceToRecipe'
      );
    });

    it('should call the addSubstanceToRecipe with correct parameters', async () => {
      addSubstanceToRecipeSpy.mockResolvedValue(undefined);

      const result = recipeSubstanceController.addSubstanceToRecipe(
        givenUser,
        givenRecipeId,
        givenCreateRecipeSubstanceDTO
      );

      const expectedCreateRecipeSubstanceDTO = {
        substanceId: '245',
        substanceAmount: 300,
        substanceUnit: '2',
      };
      await expect(result).resolves.toBeUndefined();
      expect(addSubstanceToRecipeSpy).toBeCalledTimes(1);
      expect(addSubstanceToRecipeSpy).toBeCalledWith(
        givenRecipeId,
        expectedCreateRecipeSubstanceDTO
      );
    });

    it('should throw an ForbiddenException if user is not allowed', async () => {
      userIsAllowedToEditRecipeSpy.mockRejectedValue(new ForbiddenException());

      const result = recipeSubstanceController.addSubstanceToRecipe(
        givenUser,
        givenRecipeId,
        givenCreateRecipeSubstanceDTO
      );

      await expect(result).rejects.toThrow(ForbiddenException);
      expect(addSubstanceToRecipeSpy).not.toBeCalled();
    });

    it('should throw an BadRequestException if anything fails', async () => {
      addSubstanceToRecipeSpy.mockRejectedValue(new Error());

      const result = recipeSubstanceController.addSubstanceToRecipe(
        givenUser,
        givenRecipeId,
        givenCreateRecipeSubstanceDTO
      );

      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAllSubstancesByRecipeId', () => {
    let givenUser: RequestUser;
    let givenRecipeId: string;
    let findAllSubstancesByRecipeIdSpy: jest.SpyInstance;

    beforeEach(() => {
      givenUser = {
        userId: '100',
        username: 'IronMan',
      };
      givenRecipeId = '100';
      findAllSubstancesByRecipeIdSpy = jest.spyOn(
        recipeSubstanceService,
        'findAllSubstancesByRecipeId'
      );
      userIsAllowedToEditRecipeSpy.mockReset();
    });

    it('should call findAllSubstancesByRecipeId with correct parameters', async () => {
      findAllSubstancesByRecipeIdSpy.mockResolvedValue([]);

      const result = recipeSubstanceController.findAllSubstancesByRecipeId(
        givenUser,
        givenRecipeId
      );

      await expect(result).resolves.toEqual([]);
      expect(findAllSubstancesByRecipeIdSpy).toBeCalledTimes(1);
      expect(findAllSubstancesByRecipeIdSpy).toBeCalledWith(givenRecipeId);
    });

    it('should throw ForbiddenException if user is not allowed', async () => {
      userIsAllowedToEditRecipeSpy.mockRejectedValue(new ForbiddenException());

      const result = recipeSubstanceController.findAllSubstancesByRecipeId(
        givenUser,
        givenRecipeId
      );

      await expect(result).rejects.toThrowError(ForbiddenException);
      expect(findAllSubstancesByRecipeIdSpy).not.toBeCalled();
    });
  });

  describe('updateSubstanceOfRecipeById', () => {
    let givenUser: RequestUser;
    let givenRecipeId: string;
    let givenSubstanceId: string;
    let givenUpdateRecipeSubstanceDTO: UpdateRecipeSubstanceRequestValidator;
    let updateSubstanceOfRecipeByIdSpy: jest.SpyInstance;

    beforeEach(() => {
      givenUser = {
        userId: '100',
        username: 'IronMan',
      };
      givenRecipeId = '100';
      givenSubstanceId = '300';
      givenUpdateRecipeSubstanceDTO = {
        substanceId: '234',
        substanceAmount: 2.1,
        substanceUnit: '3',
      };
      updateSubstanceOfRecipeByIdSpy = jest.spyOn(
        recipeSubstanceService,
        'updateSubstanceOfRecipeById'
      );
    });

    it('should call updateSubstanceOfRecipeById with correct parameters', async () => {
      updateSubstanceOfRecipeByIdSpy.mockResolvedValue(true);

      const result = recipeSubstanceController.updateSubstanceOfRecipeById(
        givenUser,
        givenRecipeId,
        givenSubstanceId,
        givenUpdateRecipeSubstanceDTO
      );

      const expectedUpdateRecipeSubstanceDTO: UpdateRecipeSubstanceRequestValidator =
        {
          substanceId: '300',
          substanceAmount: 2.1,
          substanceUnit: '3',
        };
      await expect(result).resolves.toBeUndefined();
      expect(updateSubstanceOfRecipeByIdSpy).toBeCalledTimes(1);
      expect(updateSubstanceOfRecipeByIdSpy).toBeCalledWith(
        givenRecipeId,
        expectedUpdateRecipeSubstanceDTO
      );
    });

    it('should throw ForbiddenException if user is not allowed', async () => {
      userIsAllowedToEditRecipeSpy.mockRejectedValue(new ForbiddenException());

      const result = recipeSubstanceController.updateSubstanceOfRecipeById(
        givenUser,
        givenRecipeId,
        givenSubstanceId,
        givenUpdateRecipeSubstanceDTO
      );

      await expect(result).rejects.toThrowError(ForbiddenException);
      expect(updateSubstanceOfRecipeByIdSpy).not.toBeCalled();
    });
  });

  describe('deleteSubstanceFromRecipe', () => {
    let givenUser: RequestUser;
    let givenRecipeId: string;
    let givenSubstanceId: string;
    let deleteSubstanceFromRecipeSpy: jest.SpyInstance;

    beforeEach(() => {
      givenUser = {
        userId: '100',
        username: 'IronMan',
      };
      givenRecipeId = '100';
      givenSubstanceId = '300';
      deleteSubstanceFromRecipeSpy = jest.spyOn(
        recipeSubstanceService,
        'deleteSubstanceFromRecipe'
      );
    });

    it('should call deleteSubstanceFromRecipe with correct parameters', async () => {
      deleteSubstanceFromRecipeSpy.mockResolvedValue(undefined);

      const result = recipeSubstanceController.deleteSubstanceFromRecipe(
        givenUser,
        givenRecipeId,
        givenSubstanceId
      );

      await expect(result).resolves.toBeUndefined();
      expect(deleteSubstanceFromRecipeSpy).toBeCalledTimes(1);
      expect(deleteSubstanceFromRecipeSpy).toBeCalledWith(
        givenRecipeId,
        givenSubstanceId
      );
    });

    it('should throw ForbiddenException if user is not allowed', async () => {
      userIsAllowedToEditRecipeSpy.mockRejectedValue(new ForbiddenException());

      const result = recipeSubstanceController.deleteSubstanceFromRecipe(
        givenUser,
        givenRecipeId,
        givenSubstanceId
      );

      await expect(result).rejects.toThrow(ForbiddenException);
      expect(deleteSubstanceFromRecipeSpy).not.toBeCalled();
    });
  });
});
