import { AppUser } from '@foodlist/foodlist-api/typeorm-entities';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { AppUserService } from '../services/app-user.service';

describe('AppUserService', () => {
  let appUserService: AppUserService;
  let appUserRepo: Repository<AppUser>;

  beforeEach(async () => {
    const appUserRepositoryMock: Partial<Repository<AppUser>> = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(AppUser),
          useValue: appUserRepositoryMock,
        },
        AppUserService,
      ],
    }).compile();

    appUserService = module.get<AppUserService>(AppUserService);
    appUserRepo = module.get<Repository<AppUser>>(getRepositoryToken(AppUser));
  });

  it('should be defined', () => {
    expect(appUserService).toBeDefined();
    expect(appUserRepo).toBeDefined();
  });

  describe('findAppUserById', () => {
    it('should call findOne with id', async () => {
      // given
      const userId = '1';
      const appUserSpy = jest
        .spyOn(appUserRepo, 'findOne')
        .mockResolvedValue(null);
      // when
      appUserService.findAppUserById(userId);
      // then
      expect(appUserSpy).toBeCalledTimes(1);
      expect(appUserSpy).toBeCalledWith({ where: { userId } });
    });
  });
  describe('findAppUserByUsername', () => {
    it('should call findOne', () => {
      // given
      const username = 'IronMan';
      const appUserRepoSpy = jest.spyOn(appUserRepo, 'findOne');
      // when
      appUserService.findAppUserByUsername(username);
      // then
      expect(appUserRepoSpy).toBeCalledTimes(1);
      const findOptions: FindOneOptions<AppUser> = {
        where: {
          username: username,
        },
      };
      expect(appUserRepoSpy).toBeCalledWith(findOptions);
    });
  });
});
