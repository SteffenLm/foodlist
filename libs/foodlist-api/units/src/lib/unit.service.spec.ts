import { Unit } from '@foodlist/foodlist-api/typeorm-entities';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitService } from './unit.service';

const unit: Unit = new Unit();
unit.unitId = '1';
unit.unitName = 'Stück';

const mockRepository = {
  findOne: jest.fn().mockResolvedValue(unit),
};

describe('UnitService', () => {
  let service: UnitService;
  let repo: Repository<Unit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Unit),
          useValue: mockRepository,
        },
        UnitService,
      ],
    }).compile();

    service = module.get<UnitService>(UnitService);
    repo = module.get<Repository<Unit>>(getRepositoryToken(Unit));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('findUnitById', () => {
    it('should call the repository with the right id', () => {
      // given
      const id = 'TEST';
      const repoSpy = jest.spyOn(repo, 'findOne');

      // when
      service.findUnitById(id);

      // then
      expect(repoSpy).toBeCalledWith({
        where: {
          unitId: id,
        },
      });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
