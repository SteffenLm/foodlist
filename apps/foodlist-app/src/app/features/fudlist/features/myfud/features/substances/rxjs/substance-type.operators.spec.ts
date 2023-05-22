import { TestScheduler } from 'rxjs/testing';
import { SubstanceType } from '../models/substance.enum';
import { SubstanceService } from '../services/substance.service';
import {
  mapSubstanceTypeToSubstances,
  mapSubstanceTypeToSubstanceTypeName,
} from './substance-type.operators';

describe('test substance type related operators', () => {
  let scheduler: TestScheduler;
  let ingredientSubstanceType: SubstanceType;
  let spiceSubstanceType: SubstanceType;
  beforeEach(() => {
    scheduler = new TestScheduler((actualValues, expectedValues) => {
      expect(actualValues).toEqual(expectedValues);
    });
    ingredientSubstanceType = SubstanceType.ingredient;
    spiceSubstanceType = SubstanceType.spice;
  });

  it('should return "Zutat"', () => {
    scheduler.run(({ expectObservable }) => {
      const givenMarble = 'a|';
      const givenMarbleValues = {
        a: ingredientSubstanceType,
      };
      const givenObserable = scheduler
        .createHotObservable<SubstanceType>(givenMarble, givenMarbleValues)
        .pipe(mapSubstanceTypeToSubstanceTypeName);

      const expectedMarbleValues = {
        a: 'Zutat',
      };
      expectObservable(givenObserable).toBe(givenMarble, expectedMarbleValues);
    });
  });

  it('should return "Gewürz"', () => {
    scheduler.run(({ expectObservable }) => {
      const givenMarble = 'a|';
      const givenMarbleValues = {
        a: spiceSubstanceType,
      };
      const givenObserable = scheduler
        .createHotObservable<SubstanceType>(givenMarble, givenMarbleValues)
        .pipe(mapSubstanceTypeToSubstanceTypeName);

      const expectedMarbleValues = {
        a: 'Gewürz',
      };
      expectObservable(givenObserable).toBe(givenMarble, expectedMarbleValues);
    });
  });
});

describe('test substance type related switchmap operator', () => {
  let scheduler: TestScheduler;
  let ingredientSubstanceType: SubstanceType;
  let spiceSubstanceType: SubstanceType;
  let mockSubstanceService: SubstanceService;

  beforeEach(() => {
    scheduler = new TestScheduler((actualValues, expectedValues) => {
      expect(actualValues).toEqual(expectedValues);
    });
    ingredientSubstanceType = SubstanceType.ingredient;
    spiceSubstanceType = SubstanceType.spice;
    // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getIngredients', 'getSpices']);
    const valueServiceSpy: Partial<SubstanceService> = {
      getIngredients: jest.fn(),
      getSpices: jest.fn(),
    };
    // set the value to return when the `getValue` spy is called.
    (
      valueServiceSpy.getIngredients as unknown as jest.SpyInstance
    ).mockReturnValue('I');
    (valueServiceSpy.getSpices as unknown as jest.SpyInstance).mockReturnValue(
      'S'
    );
    mockSubstanceService = valueServiceSpy as SubstanceService;
  });

  it('should return ingredients observable', () => {
    scheduler.run(({ expectObservable }) => {
      const givenMarble = 'a|';
      const givenMarbleValues = {
        a: ingredientSubstanceType,
      };
      const givenObserable = scheduler
        .createHotObservable<SubstanceType>(givenMarble, givenMarbleValues)
        .pipe(mapSubstanceTypeToSubstances(mockSubstanceService));

      const expectedMarbleValues = {
        a: 'I',
      };
      expectObservable(givenObserable).toBe(givenMarble, expectedMarbleValues);
    });
  });

  it('should return spice observable', () => {
    scheduler.run(({ expectObservable }) => {
      const givenMarble = 'a|';
      const givenMarbleValues = {
        a: spiceSubstanceType,
      };
      const givenObserable = scheduler
        .createHotObservable<SubstanceType>(givenMarble, givenMarbleValues)
        .pipe(mapSubstanceTypeToSubstances(mockSubstanceService));

      const expectedMarbleValues = {
        a: 'S',
      };
      expectObservable(givenObserable).toBe(givenMarble, expectedMarbleValues);
    });
  });
});
