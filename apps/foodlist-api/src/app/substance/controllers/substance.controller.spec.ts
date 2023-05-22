import { RequestUser } from '@foodlist/foodlist-api/auth';
import { Substance } from '@foodlist/foodlist-api/typeorm-entities';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSubstance } from '../dto/create-substance.dto';
import { UpdateSubstance } from '../dto/update-substance.dto';
import { SubstanceService } from '../services/substance.service';
import { SubstanceController } from './substance.controller';

describe('Substance Controller', () => {
  let substanceController: SubstanceController;
  let substanceService: SubstanceService;
  let mockSubstanceService: Partial<SubstanceService>;

  beforeEach(async () => {
    mockSubstanceService = {
      createSubstance: jest.fn(),
      findAllPublicSubstances: jest.fn(),
      findAllSubstancesByUserId: jest.fn(),
      updateSubstance: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubstanceController],
      providers: [
        {
          provide: SubstanceService,
          useValue: mockSubstanceService,
        },
      ],
    }).compile();

    substanceService = module.get<SubstanceService>(SubstanceService);
    substanceController = module.get<SubstanceController>(SubstanceController);
  });

  it('should be defined', () => {
    expect(substanceController).toBeDefined();
    expect(substanceService).toBeDefined();
  });

  describe('createSubstance', () => {
    let user: RequestUser;
    let createSubstanceDTO: CreateSubstance;

    beforeEach(async () => {
      mockSubstanceService.createSubstance = jest.fn();
      user = {
        userId: '1',
        username: 'IronMan',
      };

      createSubstanceDTO = {
        substanceName: 'Blumenkohl',
        substanceDefaultUnitId: '3',
        substanceTypeId: '1',
      };
    });
    it('should call the service method with correct parameters', async () => {
      // given
      const createSubstanceSpy = jest
        .spyOn(substanceService, 'createSubstance')
        .mockResolvedValue(null);
      // when
      await substanceController.createSubstance(user, createSubstanceDTO);
      // then
      expect(createSubstanceSpy).toBeCalledTimes(1);
      expect(createSubstanceSpy).toBeCalledWith(
        {
          substanceDefaultUnitId: createSubstanceDTO.substanceDefaultUnitId,
          substanceName: createSubstanceDTO.substanceName,
          substanceTypeId: createSubstanceDTO.substanceTypeId,
        },
        '1'
      );
    });
    it('should handle reject', async () => {
      // given
      const createSubstanceSpy = jest
        .spyOn(substanceService, 'createSubstance')
        .mockRejectedValue(new Error());
      expect.assertions(1);
      try {
        // when
        await substanceController.createSubstance(user, createSubstanceDTO);
      } catch {
        // then
        expect(createSubstanceSpy).toBeCalled();
      }
    });
  });

  describe('getAllSubstances', () => {
    let user: RequestUser;
    let findPublicSubstanceSpy: jest.SpyInstance;
    let findSubstancesOfUserSpy: jest.SpyInstance;

    beforeEach(() => {
      user = {
        userId: '1',
        username: 'IronMan',
      };
      findPublicSubstanceSpy = jest.spyOn(
        substanceService,
        'findAllPublicSubstances'
      );
      findSubstancesOfUserSpy = jest.spyOn(
        substanceService,
        'findAllSubstancesByUserId'
      );
    });

    afterEach(() => {
      findPublicSubstanceSpy.mockReset();
      findSubstancesOfUserSpy.mockReset();
    });

    it('should call user service with userid', async () => {
      // given
      findPublicSubstanceSpy.mockResolvedValue([]);
      findSubstancesOfUserSpy.mockResolvedValue([]);
      // when
      await substanceController.getAllSubstances(user);
      // then
      expect(findSubstancesOfUserSpy).toBeCalledTimes(1);
      expect(findSubstancesOfUserSpy).toBeCalledWith(user.userId);
    });
    it('should call public substances', async () => {
      findPublicSubstanceSpy.mockResolvedValue([]);
      findSubstancesOfUserSpy.mockResolvedValue([]);
      // when
      await substanceController.getAllSubstances(user);
      // then
      expect(findPublicSubstanceSpy).toBeCalledTimes(1);
      expect(findPublicSubstanceSpy).toBeCalledWith();
    });
    it('should return only public substances', async () => {
      // given
      const mockedPublicSubstances: Partial<Substance>[] = [
        { substanceId: '1', substanceName: 'Penne' },
        { substanceId: '2', substanceName: 'Mais' },
        { substanceId: '3', substanceName: 'Rucola' },
      ];
      findPublicSubstanceSpy.mockResolvedValue(mockedPublicSubstances);
      findSubstancesOfUserSpy.mockResolvedValue([]);
      // when
      const result = await substanceController.getAllSubstances(user);
      // then
      expect(result.length).toEqual(3);
    });
    it('should return public and private substances', async () => {
      // given
      const mockedPublicSubstances: Partial<Substance>[] = [
        { substanceId: '1', substanceName: 'Penne' },
        { substanceId: '2', substanceName: 'Mais' },
        { substanceId: '3', substanceName: 'Rucola' },
      ];
      findPublicSubstanceSpy.mockResolvedValue(mockedPublicSubstances);
      const mockedUserSubstances: Partial<Substance>[] = [
        { substanceId: '4', substanceName: 'Sahne' },
        { substanceId: '5', substanceName: 'Reis' },
      ];
      findSubstancesOfUserSpy.mockResolvedValue([mockedUserSubstances]);
      // when
      const result = await substanceController.getAllSubstances(user);
      // then
      expect(result.length).toEqual(5);
    });
  });
  describe('updateSubstance', () => {
    it('should call service method with right parameters', async () => {
      // given
      const userId = '1';
      const udpateSubstanceDTO: UpdateSubstance = {
        substanceName: 'Blumenkohl',
        substanceTypeId: '1',
        substanceDefaultUnitId: '2',
      };
      const substanceServiceSpy = jest.spyOn(
        substanceService,
        'updateSubstance'
      );
      // when
      await substanceController.updateSubstance(userId, udpateSubstanceDTO);
      // then
      expect(substanceServiceSpy).toBeCalledTimes(1);
      expect(substanceServiceSpy).toBeCalledWith(userId, {
        substanceDefaultUnitId: udpateSubstanceDTO.substanceDefaultUnitId,
        substanceName: udpateSubstanceDTO.substanceName,
        substanceTypeId: udpateSubstanceDTO.substanceTypeId,
      });
    });
  });
});
