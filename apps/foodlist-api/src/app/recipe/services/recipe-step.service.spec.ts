import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateRecipeStepRequestValidator } from '../request-validators/recipe-step/create-recipe-step.request-validator';
import { UpdateRecipeStepRequestValidator } from '../request-validators/recipe-step/update-recipe-step.request-validator';

import { RecipeStep } from '@foodlist/foodlist-api/typeorm-entities';
import { RecipeStepService } from './recipe-step.service';

let recipeStepService: RecipeStepService;
let recipeStepRepo: Repository<RecipeStep>;

describe('RecipeStepService', () => {
  let recipeSubstanceRepositoryMock: Partial<Repository<RecipeStep>>;

  beforeEach(async () => {
    recipeSubstanceRepositoryMock = {
      create: jest.fn().mockReturnValue(new RecipeStep()),
      insert: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(RecipeStep),
          useValue: recipeSubstanceRepositoryMock,
        },
        RecipeStepService,
      ],
    }).compile();

    recipeStepRepo = module.get<Repository<RecipeStep>>(
      getRepositoryToken(RecipeStep)
    );
    recipeStepService = module.get<RecipeStepService>(RecipeStepService);
  });

  it('should be defined', () => {
    expect(recipeStepRepo).toBeDefined();
    expect(recipeStepService).toBeDefined();
  });

  it('should call insert with right parameters', async () => {
    const givenRecipeId = '1000';
    const givenCreateRecipeStepDto: CreateRecipeStepRequestValidator = {
      stepInstruction: 'Add Apple to Sugar',
      stepNumber: 1,
    };

    const insertSpy = jest.spyOn(recipeStepRepo, 'insert');
    await recipeStepService.addStepToRecipe(
      givenRecipeId,
      givenCreateRecipeStepDto
    );

    const expectedCall = {
      recipeId: '1000',
      stepInstruction: 'Add Apple to Sugar',
      stepNumber: 1,
    };
    expect(insertSpy).toBeCalledTimes(1);
    expect(insertSpy).toBeCalledWith(expectedCall);
  });

  it('should call find with right parameters', async () => {
    const givenRecipeId = '1000';

    const findSpy = jest.spyOn(recipeStepRepo, 'find');
    await recipeStepService.findAllStepsByRecipeId(givenRecipeId);

    const expectedCall: FindManyOptions<RecipeStep> = {
      where: {
        recipeId: givenRecipeId,
      },
      order: {
        stepNumber: 'ASC',
      },
    };
    expect(findSpy).toBeCalledTimes(1);
    expect(findSpy).toBeCalledWith(expectedCall);
  });

  it('should call update with right parameters', async () => {
    const givenStepId = '1000';
    const givenUpdateRecipeStepDto: UpdateRecipeStepRequestValidator = {
      stepInstruction: 'Slice Apple into Pieces',
      stepNumber: 1,
    };
    const updateSpy = jest.spyOn(recipeStepRepo, 'update');

    await recipeStepService.updateRecipeStepById(
      givenStepId,
      givenUpdateRecipeStepDto
    );

    const expectedFindOptions: FindOptionsWhere<RecipeStep> = {
      recipeStepId: givenStepId,
    };
    const expectedRecipeStep: Partial<RecipeStep> = {
      stepInstruction: 'Slice Apple into Pieces',
      stepNumber: 1,
    };
    expect(updateSpy).toBeCalledTimes(1);
    expect(updateSpy).toBeCalledWith(expectedFindOptions, expectedRecipeStep);
  });

  it('should call delete with right parameters', async () => {
    const givenStepId = '1000';
    const updateSpy = jest.spyOn(recipeStepRepo, 'delete');

    await recipeStepService.deleteRecipeStepById(givenStepId);

    const expectedFindOptions: FindOptionsWhere<RecipeStep> = {
      recipeStepId: givenStepId,
    };
    expect(updateSpy).toBeCalledTimes(1);
    expect(updateSpy).toBeCalledWith(expectedFindOptions);
  });
});
