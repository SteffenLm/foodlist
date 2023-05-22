import { AppUser, Recipe } from '@foodlist/foodlist-api/typeorm-entities';
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeRequestValidator } from '../request-validators/recipe/create-recipe.request-validator';
import { UpdateRecipeRequestValidator } from '../request-validators/recipe/update-recipe.request-validator';
import { RecipeService } from './recipe.service';

let recipeService: RecipeService;
let recipeRepo: Repository<Recipe>;
let recipeRepositoryMock: Partial<Repository<Recipe>>;

describe('RecipeService', () => {
  recipeRepositoryMock = {
    insert: jest.fn(),
    create: jest.fn().mockReturnValue(new Recipe()),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    recipeRepositoryMock = {
      insert: jest.fn(),
      create: jest.fn().mockReturnValue(new Recipe()),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Recipe),
          useValue: recipeRepositoryMock,
        },
        RecipeService,
      ],
    }).compile();

    recipeRepo = module.get<Repository<Recipe>>(getRepositoryToken(Recipe));
    recipeService = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(recipeRepo).toBeDefined();
    expect(recipeService).toBeDefined();
  });

  it('should call insert with the right parameters', async () => {
    const givenRecipeDTO: CreateRecipeRequestValidator = {
      recipeName: 'Appleporridge',
      recipeServings: 2,
    };
    await recipeService.createRecipe(givenRecipeDTO, '1');
    expect(recipeRepo.insert).toHaveBeenCalledTimes(1);
    expect(recipeRepo.insert).toHaveBeenCalledWith({
      recipeCreator: { userId: '1' },
      recipeName: 'Appleporridge',
      recipeServings: 2,
    });
  });

  it('should call find with the right parameters', async () => {
    await recipeService.findAllRecipesByUserId('1');
    expect(recipeRepo.find).toHaveBeenCalledTimes(1);
    expect(recipeRepo.find).toHaveBeenCalledWith({
      where: {
        recipeCreator: { userId: '1' },
      },
    });
  });

  it('should call findOne with the right parameters', async () => {
    await recipeService.findRecipeById('1');
    expect(recipeRepo.findOne).toHaveBeenCalledTimes(1);
    expect(recipeRepo.findOne).toHaveBeenCalledWith({
      where: {
        recipeId: '1',
      },
      relations: [
        'recipeCreator',
        'recipeSubstances',
        'recipeSubstances.substanceUnit',
        'recipeSubstances.substance',
        'recipeSubstances.substance.substanceType',
        'recipeSteps',
      ],
    });
  });

  it('should update an existing recipe', async () => {
    const updatedRecipe: UpdateRecipeRequestValidator = {
      recipeName: 'Penne',
      recipeServings: 3,
    };
    await recipeService.updateRecipeById('1', updatedRecipe);
    expect(recipeRepo.update).toHaveBeenCalledTimes(1);
    expect(recipeRepo.update).toHaveBeenCalledWith('1', updatedRecipe);
  });

  it('should update servings of existing recipe', async () => {
    const updatedRecipe: UpdateRecipeRequestValidator = {
      recipeServings: 3,
    };

    const result = recipeService.updateRecipeById('1', updatedRecipe);

    const expectedRecipe: UpdateRecipeRequestValidator = {
      recipeServings: 3,
    };
    await expect(result).resolves.toBeUndefined();
    expect(recipeRepo.update).toHaveBeenCalledTimes(1);
    expect(recipeRepo.update).toHaveBeenCalledWith('1', expectedRecipe);
  });
  it('should update name of existing recipe', async () => {
    const updatedRecipe: Partial<UpdateRecipeRequestValidator> = {
      recipeName: 'Penne',
    };
    await recipeService.updateRecipeById('1', updatedRecipe);
    const expectedRecipe: Partial<UpdateRecipeRequestValidator> = {
      recipeName: 'Penne',
    };
    expect(recipeRepo.update).toHaveBeenCalledTimes(1);
    expect(recipeRepo.update).toHaveBeenCalledWith('1', expectedRecipe);
  });

  it('should resolve true if user is creator', async () => {
    const givenRecipeId = '1000';
    const givenUserId = '100';
    const mockedRecipe: Recipe = new Recipe();
    mockedRecipe.recipeCreator = new AppUser();
    mockedRecipe.recipeCreator.userId = '100';

    jest.spyOn(recipeService, 'findRecipeById').mockResolvedValue(mockedRecipe);

    const result = await recipeService.userIsAllowedToEditRecipe(
      givenRecipeId,
      givenUserId
    );
    expect(result).toBeTruthy();
  });

  it('should reject if user is not creator', async () => {
    const givenRecipeId = '1000';
    const givenUserId = '100';
    const mockedRecipe: Recipe = new Recipe();
    mockedRecipe.recipeCreator = new AppUser();
    mockedRecipe.recipeCreator.userId = '200';

    jest.spyOn(recipeService, 'findRecipeById').mockResolvedValue(mockedRecipe);

    const resultPromise = recipeService.userIsAllowedToEditRecipe(
      givenRecipeId,
      givenUserId
    );
    await expect(resultPromise).rejects.toThrowError(ForbiddenException);
  });
});
