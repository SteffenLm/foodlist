import { Substance } from '@foodlist/foodlist-api/typeorm-entities';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { SubstanceService } from './substance.service';

const substanceRepositoryMock: Partial<Repository<Substance>> = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  insert: jest.fn(),
};

describe('SubstanceService', () => {
  let substanceService: SubstanceService;
  let substanceRepo: Repository<Substance>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Substance),
          useValue: substanceRepositoryMock,
        },
        SubstanceService,
      ],
    }).compile();

    substanceRepo = module.get<Repository<Substance>>(
      getRepositoryToken(Substance)
    );
    substanceService = module.get<SubstanceService>(SubstanceService);
  });

  it('should be defined', () => {
    expect(substanceRepo).toBeDefined();
    expect(substanceService).toBeDefined();
  });
  describe('findAllPublicSubstances', () => {
    it('should be called with relations and userId 00000000-0000-0000-0000-000000000001', () => {
      // given
      const substanceRepoSpy = jest.spyOn(substanceRepo, 'find');
      // when
      substanceService.findAllPublicSubstances();
      // then
      const expectedFindOptions: FindManyOptions<Substance> = {
        where: {
          substanceCreator: {
            userId: '00000000-0000-0000-0000-000000000001',
          },
        },
        relations: [
          'substanceDefaultUnit',
          'substanceCreator',
          'substanceType',
        ],
      };
      expect(substanceRepoSpy).toBeCalledTimes(1);
      expect(substanceRepoSpy).toBeCalledWith(expectedFindOptions);
    });
  });
  describe('findAllUserSubstances', () => {
    it('should be called with relations and custom userId', async () => {
      // given
      const substanceRepoSpy = jest.spyOn(substanceRepo, 'find');
      substanceRepoSpy.mockReset();
      const userId = '1';
      // when
      await substanceService.findAllSubstancesByUserId(userId);
      // then
      expect(substanceRepoSpy).toBeCalledTimes(1);
      const expectedFindOptions: FindManyOptions<Substance> = {
        where: {
          substanceCreator: {
            userId: userId,
          },
        },
        relations: [
          'substanceDefaultUnit',
          'substanceCreator',
          'substanceType',
        ],
      };
      expect(substanceRepoSpy).toBeCalledWith(expectedFindOptions);
    });
  });
  describe('createSubstance', () => {
    it('should be called one time', async () => {
      // given
      const substanceTypeId = '1';
      const substanceName = '';
      const substanceDefaultUnitId = '1';
      const userId = '1';
      const mockSubstanceInstance: DeepPartial<Substance> = {
        substanceName: substanceName,
        substanceDefaultUnit: {
          unitId: substanceDefaultUnitId,
        },
        substanceCreator: {
          userId: userId,
        },
        substanceType: {
          substanceTypeId: substanceTypeId,
        },
      };
      jest
        .spyOn(substanceRepo, 'create')
        .mockReturnValue(mockSubstanceInstance as Substance);
      const substanceRepoSaveSpy = jest.spyOn(substanceRepo, 'insert');

      // when
      await substanceService.createSubstance(
        {
          substanceTypeId: substanceTypeId,
          substanceName: '',
          substanceDefaultUnitId: substanceDefaultUnitId,
        },
        userId
      );

      // then
      expect(substanceRepoSaveSpy).toHaveBeenCalledTimes(1);
      expect(substanceRepoSaveSpy).toBeCalledWith(mockSubstanceInstance);
    });
  });
  describe('updateSubstance', () => {
    it('should call the update method', async () => {
      // given
      const substanceId = '1';
      const substanceTypeId = '2';
      const substanceName = 'Blumenkohl';
      const defaultUnit = '3';
      jest.spyOn(substanceRepo, 'create').mockReturnValue({
        substanceType: {
          substanceTypeId: substanceTypeId,
        },
        substanceDefaultUnit: {
          unitId: defaultUnit,
        },
        substanceName: substanceName,
      } as Substance);
      const substanceRepoUpdateSpy = jest.spyOn(substanceRepo, 'update');
      // when
      await substanceService.updateSubstance(substanceId, {
        substanceDefaultUnitId: defaultUnit,
        substanceTypeId: substanceTypeId,
        substanceName: substanceName,
      });
      // then
      expect(substanceRepoUpdateSpy).toBeCalled();
      expect(substanceRepoUpdateSpy).toBeCalledWith(substanceId, {
        substanceDefaultUnit: { unitId: defaultUnit },
        substanceName: substanceName,
        substanceType: { substanceTypeId: substanceTypeId },
      });
    });
  });
});
