import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { RecipeSubstance } from '@foodlist/foodlist-api/typeorm-entities';
import { UnitService } from '@foodlist/foodlist-api/units';
import { CreateRecipeSubstanceRequestValidator } from '../request-validators/recipe-substance/create-recipe-substance.request-validator';
import { UpdateRecipeSubstanceRequestValidator } from '../request-validators/recipe-substance/update-recipe-substance.request-validator';
import { RecipeSubstanceService } from './recipe-substance.service';

let recipeSubstanceService: RecipeSubstanceService;
let unitService: UnitService;
let recipeSubstanceRepo: Repository<RecipeSubstance>;

describe('RecipeSubstanceService', () => {
  let recipeSubstanceRepositoryMock: Partial<Repository<RecipeSubstance>>;
  let unitServiceMock: Partial<UnitService>;

  beforeEach(async () => {
    recipeSubstanceRepositoryMock = {
      create: jest.fn().mockReturnValue(new RecipeSubstance()),
      insert: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    unitServiceMock = {
      findUnitById: jest.fn().mockResolvedValue({
        unitId: '1',
        unitName: 'SPICE',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(RecipeSubstance),
          useValue: recipeSubstanceRepositoryMock,
        },
        {
          provide: UnitService,
          useValue: unitServiceMock,
        },
        RecipeSubstanceService,
      ],
    }).compile();

    recipeSubstanceRepo = module.get<Repository<RecipeSubstance>>(
      getRepositoryToken(RecipeSubstance)
    );
    recipeSubstanceService = module.get<RecipeSubstanceService>(
      RecipeSubstanceService
    );
    unitService = module.get<UnitService>(UnitService);
  });

  it('should be defined', () => {
    expect(recipeSubstanceRepo).toBeDefined();
    expect(recipeSubstanceService).toBeDefined();
    expect(unitService).toBeDefined();
  });

  it('should add a substance to a recipe', async () => {
    const givenSubstance: CreateRecipeSubstanceRequestValidator = {
      substanceId: '300',
      substanceAmount: 200,
      substanceUnit: '1',
    };
    await recipeSubstanceService.addSubstanceToRecipe('100', givenSubstance);

    const expectedCall = {
      recipeId: '100',
      substanceAmount: 200,
      substanceId: '300',
      substanceUnit: {
        unitId: '1',
        unitName: 'SPICE',
      },
    };
    expect(recipeSubstanceRepo.insert).toBeCalledTimes(1);
    expect(recipeSubstanceRepo.insert).toBeCalledWith(expectedCall);
  });

  it('should call find with right parameters', async () => {
    await recipeSubstanceService.findAllSubstancesByRecipeId('1');

    const expectedFindOptions: FindManyOptions<RecipeSubstance> = {
      relations: ['substance', 'substanceUnit'],
      where: {
        recipeId: '1',
      },
    };
    expect(recipeSubstanceRepo.find).toBeCalledTimes(1);
    expect(recipeSubstanceRepo.find).toBeCalledWith(expectedFindOptions);
  });

  it('should call update with right parameters', async () => {
    const givenSubstance: UpdateRecipeSubstanceRequestValidator = {
      substanceId: '200',
      substanceAmount: 200,
      substanceUnit: '1',
    };
    const result = await recipeSubstanceService.updateSubstanceOfRecipeById(
      '100',
      givenSubstance
    );

    const expectedFindConditions: FindOptionsWhere<RecipeSubstance> = {
      recipeId: '100',
      substanceId: '200',
    };
    const expectedRecipeSubstance: DeepPartial<RecipeSubstance> = {
      recipeId: '100',
      substanceAmount: 200,
      substanceId: '200',
      substanceUnit: { unitId: '1', unitName: 'SPICE' },
    };
    expect(result).toBeUndefined();
    expect(recipeSubstanceRepo.update).toBeCalledTimes(1);
    expect(recipeSubstanceRepo.update).toBeCalledWith(
      expectedFindConditions,
      expectedRecipeSubstance
    );
  });

  it('should call delete with right parameters', async () => {
    const recipeId = '100';
    const substanceId = '200';

    const result = await recipeSubstanceService.deleteSubstanceFromRecipe(
      recipeId,
      substanceId
    );

    const expectedFindConditions: FindOptionsWhere<RecipeSubstance> = {
      recipeId: '100',
      substanceId: '200',
    };

    expect(result).toBeUndefined();
    expect(recipeSubstanceRepo.delete).toBeCalledTimes(1);
    expect(recipeSubstanceRepo.delete).toBeCalledWith(expectedFindConditions);
  });
});
