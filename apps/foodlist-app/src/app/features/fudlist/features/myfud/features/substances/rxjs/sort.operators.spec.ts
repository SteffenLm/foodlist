import { TestScheduler } from 'rxjs/testing';
import { Unit } from '../../../../../models/unit.model';
import { SubstanceType } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';
import { sortSubstancesAscendingByName } from './sort.operators';

describe('test substance related filter operators', () => {
  let scheduler: TestScheduler;
  let substances: ISubstance[];

  beforeEach(() => {
    scheduler = new TestScheduler((actualValues, expectedValues) => {
      expect(actualValues).toEqual(expectedValues);
    });
    substances = [
      {
        substanceId: '1',
        defaultUnit: Unit.tablespoon,
        substanceName: 'Pepper',
        type: SubstanceType.spice,
      },
      {
        substanceId: '3',
        defaultUnit: Unit.gram,
        substanceName: 'Apple',
        type: SubstanceType.ingredient,
      },
      {
        substanceId: '2',
        defaultUnit: Unit.gram,
        substanceName: 'Sugar',
        type: SubstanceType.spice,
      },
      {
        substanceId: '4',
        defaultUnit: Unit.gram,
        substanceName: 'Wine',
        type: SubstanceType.ingredient,
      },
    ];
  });

  it('should sort substances by name ascending', () => {
    scheduler.run(({ expectObservable }) => {
      const givenMarble = 'a|';
      const givenMarbleValues = {
        a: substances,
      };
      const givenObserable = scheduler
        .createHotObservable<ISubstance[]>(givenMarble, givenMarbleValues)
        .pipe(sortSubstancesAscendingByName);

      const expectedMarbleValues = {
        a: [
          {
            substanceId: '3',
            defaultUnit: Unit.gram,
            substanceName: 'Apple',
            type: SubstanceType.ingredient,
          },
          {
            substanceId: '1',
            defaultUnit: Unit.tablespoon,
            substanceName: 'Pepper',
            type: SubstanceType.spice,
          },
          {
            substanceId: '2',
            defaultUnit: Unit.gram,
            substanceName: 'Sugar',
            type: SubstanceType.spice,
          },
          {
            substanceId: '4',
            defaultUnit: Unit.gram,
            substanceName: 'Wine',
            type: SubstanceType.ingredient,
          },
        ],
      };
      expectObservable(givenObserable).toBe(givenMarble, expectedMarbleValues);
    });
  });

  it('should sort also equaly named substances by name ascending', () => {
    scheduler.run(({ expectObservable }) => {
      const givenMarble = 'a|';
      const givenAdditionalApple: ISubstance = {
        substanceId: '5',
        defaultUnit: Unit.gram,
        substanceName: 'Apple',
        type: SubstanceType.ingredient,
      };
      substances.push(givenAdditionalApple);
      const givenMarbleValues = {
        a: substances,
      };
      const givenObserable = scheduler
        .createHotObservable<ISubstance[]>(givenMarble, givenMarbleValues)
        .pipe(sortSubstancesAscendingByName);

      const expectedMarbleValues = {
        a: [
          {
            substanceId: '3',
            defaultUnit: Unit.gram,
            substanceName: 'Apple',
            type: SubstanceType.ingredient,
          },
          {
            substanceId: '5',
            defaultUnit: Unit.gram,
            substanceName: 'Apple',
            type: SubstanceType.ingredient,
          },
          {
            substanceId: '1',
            defaultUnit: Unit.tablespoon,
            substanceName: 'Pepper',
            type: SubstanceType.spice,
          },
          {
            substanceId: '2',
            defaultUnit: Unit.gram,
            substanceName: 'Sugar',
            type: SubstanceType.spice,
          },
          {
            substanceId: '4',
            defaultUnit: Unit.gram,
            substanceName: 'Wine',
            type: SubstanceType.ingredient,
          },
        ],
      };
      expectObservable(givenObserable).toBe(givenMarble, expectedMarbleValues);
    });
  });
});
