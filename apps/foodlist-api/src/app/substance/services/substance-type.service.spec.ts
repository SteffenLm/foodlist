import { SubstanceType } from '@foodlist/foodlist-api/typeorm-entities';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubstanceTypeService } from './substance-type.service';

const mockRepository: Partial<Repository<SubstanceType>> = {
  findOne: jest.fn(),
};

describe('SubstanceTypeService', () => {
  let substanceTypeService: SubstanceTypeService;
  let substanceTypeRepo: Repository<SubstanceType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(SubstanceType),
          useValue: mockRepository,
        },
        SubstanceTypeService,
      ],
    }).compile();

    substanceTypeService =
      module.get<SubstanceTypeService>(SubstanceTypeService);
    substanceTypeRepo = module.get<Repository<SubstanceType>>(
      getRepositoryToken(SubstanceType)
    );
  });

  it('should be defined', () => {
    expect(substanceTypeService).toBeDefined();
    expect(substanceTypeRepo).toBeDefined();
  });

  describe('findSubstanceTypeById', () => {
    it('should call findOne with correct id ', async () => {
      // given
      const substanceId = '1';
      const findOneMock = jest.spyOn(substanceTypeRepo, 'findOne');
      // when
      await substanceTypeService.findSubstanceTypeById(substanceId);
      // then
      expect(findOneMock).toBeCalledTimes(1);
      expect(findOneMock).toBeCalledWith({
        where: {
          substanceTypeId: substanceId,
        },
      });
    });
  });
});
