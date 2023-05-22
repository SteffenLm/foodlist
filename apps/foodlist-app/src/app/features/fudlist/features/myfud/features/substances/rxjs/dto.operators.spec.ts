import { TestScheduler } from 'rxjs/testing';
import { Unit } from '../../../../../models/unit.model';
import { ISubstanceDTO } from '../models/substance.dto';
import { SubstanceType } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';
import {
  mapSubstanceDtoToSubstanceInterface,
  mapSubstanceInterfaceToCreateSubstanceDto,
  mapSubstanceInterfaceToUpdateSubstanceDto,
} from './dto.operators';

describe('Test substance related dto operators', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actualValues, expectedValues) => {
      expect(actualValues).toEqual(expectedValues);
    });
  });

  describe('Convert ISubstance to ICreateSubstanceDTO', () => {
    let ingredient: ISubstance;
    let spice: ISubstance;

    beforeEach(() => {
      spice = {
        substanceId: '',
        substanceName: 'Pepper',
        type: SubstanceType.spice,
        defaultUnit: 0 as unknown as Unit,
      };
      ingredient = {
        substanceId: '',
        substanceName: 'Penne',
        type: SubstanceType.ingredient,
        defaultUnit: 0 as unknown as Unit,
      };
    });

    it('should convert spice', () => {
      scheduler.run(({ expectObservable }) => {
        const givenMarble = 'a|';
        const givenMarbleValues = {
          a: spice,
        };
        const givenObserable = scheduler
          .createHotObservable<ISubstance>(givenMarble, givenMarbleValues)
          .pipe(mapSubstanceInterfaceToCreateSubstanceDto);

        const expectedMarbleValues = {
          a: {
            substanceTypeId: SubstanceType.spice,
            substanceName: 'Pepper',
            substanceDefaultUnitId: Unit.none,
          },
        };
        expectObservable(givenObserable).toBe(
          givenMarble,
          expectedMarbleValues
        );
      });
    });

    it('should convert ingredient', () => {
      scheduler.run(({ expectObservable }) => {
        const givenMarble = 'a|';
        const givenMarbleValues = {
          a: ingredient,
        };
        const givenObserable = scheduler
          .createHotObservable<ISubstance>(givenMarble, givenMarbleValues)
          .pipe(mapSubstanceInterfaceToCreateSubstanceDto);

        const expectedMarbleValues = {
          a: {
            substanceTypeId: SubstanceType.ingredient,
            substanceName: 'Penne',
            substanceDefaultUnitId: Unit.none,
          },
        };
        expectObservable(givenObserable).toBe(
          givenMarble,
          expectedMarbleValues
        );
      });
    });
  });

  describe('Convert ISubstance to IUpdateSubstanceDTO', () => {
    let spice: ISubstance;
    let ingredient: ISubstance;

    beforeEach(() => {
      spice = {
        substanceId: '1',
        substanceName: 'Pepper',
        type: SubstanceType.spice,
        defaultUnit: 0 as unknown as Unit,
      };
      ingredient = {
        substanceId: '1',
        substanceName: 'Penne',
        type: SubstanceType.ingredient,
        defaultUnit: 0 as unknown as Unit,
      };
    });

    it('should convert spice ISubstance to UpdateSubstanceDto', () => {
      scheduler.run(({ expectObservable }) => {
        const givenMarble = 'a|';
        const givenMarbleValues = {
          a: spice,
        };
        const givenObserable = scheduler
          .createHotObservable<ISubstance>(givenMarble, givenMarbleValues)
          .pipe(mapSubstanceInterfaceToUpdateSubstanceDto);

        const expectedMarbleValues = {
          a: {
            substanceId: '1',
            substanceName: 'Pepper',
            substanceTypeId: SubstanceType.spice,
            substanceDefaultUnitId: Unit.none,
          },
        };
        expectObservable(givenObserable).toBe(
          givenMarble,
          expectedMarbleValues
        );
      });
    });

    it('should convert ingredient ISubstance to UpdateSubstanceDto', () => {
      scheduler.run(({ expectObservable }) => {
        const givenMarble = 'a|';
        const givenMarbleValues = {
          a: ingredient,
        };
        const givenObserable = scheduler
          .createHotObservable<ISubstance>(givenMarble, givenMarbleValues)
          .pipe(mapSubstanceInterfaceToUpdateSubstanceDto);

        const expectedMarbleValues = {
          a: {
            substanceId: '1',
            substanceName: 'Penne',
            substanceTypeId: SubstanceType.ingredient,
            substanceDefaultUnitId: Unit.none,
          },
        };
        expectObservable(givenObserable).toBe(
          givenMarble,
          expectedMarbleValues
        );
      });
    });
  });

  describe('Convert ISubstanceDTO[] to ISubstance[]', () => {
    let ingredientDTO: ISubstanceDTO;
    let spiceDTO: ISubstanceDTO;

    beforeEach(() => {
      ingredientDTO = {
        substanceId: '1',
        substanceName: 'Penne',
        substanceCreator: {
          userId: '1',
        },
        substanceDefaultUnit: {
          unitId: Unit.none,
          unitName: 'NONE',
        },
        substanceType: {
          substanceTypeId: SubstanceType.ingredient,
          substanceTypeName: 'INGREDIENT',
        },
      };
      spiceDTO = {
        substanceId: '1',
        substanceName: 'Pepper',
        substanceCreator: {
          userId: '1',
        },
        substanceDefaultUnit: {
          unitId: Unit.none,
          unitName: 'NONE',
        },
        substanceType: {
          substanceTypeId: SubstanceType.spice,
          substanceTypeName: 'SPICE',
        },
      };
    });

    it('should convert ingredient ISubstanceDTO[] to ISubstance[]', () => {
      scheduler.run(({ expectObservable }) => {
        const givenSubstanceDTOs: ISubstanceDTO[] = [ingredientDTO];
        const givenMarble = 'a|';
        const givenMarbleValues = {
          a: givenSubstanceDTOs,
        };
        const givenObserable = scheduler
          .createHotObservable<ISubstanceDTO[]>(givenMarble, givenMarbleValues)
          .pipe(mapSubstanceDtoToSubstanceInterface);

        const expectedSubstances: ISubstance[] = [
          {
            substanceId: '1',
            substanceName: 'Penne',
            defaultUnit: Unit.none,
            type: SubstanceType.ingredient,
          },
        ];
        const expectedMarbleValues = {
          a: expectedSubstances,
        };
        expectObservable(givenObserable).toBe(
          givenMarble,
          expectedMarbleValues
        );
      });
    });
    it('should convert spice ISubstanceDTO[] to ISubstance[]', () => {
      scheduler.run(({ expectObservable }) => {
        const givenSubstanceDTOs: ISubstanceDTO[] = [spiceDTO];
        const givenMarble = 'a|';
        const givenMarbleValues = {
          a: givenSubstanceDTOs,
        };
        const givenObserable = scheduler
          .createHotObservable<ISubstanceDTO[]>(givenMarble, givenMarbleValues)
          .pipe(mapSubstanceDtoToSubstanceInterface);

        const expectedSubstances: ISubstance[] = [
          {
            substanceId: '1',
            substanceName: 'Pepper',
            defaultUnit: Unit.none,
            type: SubstanceType.spice,
          },
        ];
        const expectedMarbleValues = {
          a: expectedSubstances,
        };
        expectObservable(givenObserable).toBe(
          givenMarble,
          expectedMarbleValues
        );
      });
    });
    it('should convert ingredient and spice ISubstanceDTO[] to ISubstance[]', () => {
      scheduler.run(({ expectObservable }) => {
        const givenSubstanceDTOs: ISubstanceDTO[] = [ingredientDTO, spiceDTO];

        const givenMarble = 'a|';
        const givenMarbleValues = {
          a: givenSubstanceDTOs,
        };
        const givenObserable = scheduler
          .createHotObservable<ISubstanceDTO[]>(givenMarble, givenMarbleValues)
          .pipe(mapSubstanceDtoToSubstanceInterface);

        const expectedSubstances: ISubstance[] = [
          {
            substanceId: '1',
            substanceName: 'Penne',
            defaultUnit: Unit.none,
            type: SubstanceType.ingredient,
          },
          {
            substanceId: '1',
            substanceName: 'Pepper',
            defaultUnit: Unit.none,
            type: SubstanceType.spice,
          },
        ];
        const expectedMarbleValues = {
          a: expectedSubstances,
        };
        expectObservable(givenObserable).toBe(
          givenMarble,
          expectedMarbleValues
        );
      });
    });
  });
});
