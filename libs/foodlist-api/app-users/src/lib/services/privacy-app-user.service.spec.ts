import { AppUser } from '@foodlist/foodlist-api/typeorm-entities';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { PrivacyAppUserService } from './privacy-app-user.service';

describe('PrivacyAppUserService', () => {
  let privacyAppUserService: PrivacyAppUserService;
  let appUserRepo: Repository<AppUser>;

  beforeEach(async () => {
    const mockRepository: Partial<Repository<AppUser>> = {
      findOne: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(AppUser),
          useValue: mockRepository,
        },
        PrivacyAppUserService,
      ],
    }).compile();

    privacyAppUserService = module.get<PrivacyAppUserService>(
      PrivacyAppUserService
    );
    appUserRepo = module.get<Repository<AppUser>>(getRepositoryToken(AppUser));
  });

  it('should be defined', () => {
    expect(privacyAppUserService).toBeDefined();
    expect(appUserRepo).toBeDefined();
  });

  describe('findAppUserByUsername', () => {
    it('should return user with auth data', () => {
      // given
      const username = 'TonyStark';
      const appUserRepoSpy = jest.spyOn(appUserRepo, 'findOne');
      // when
      privacyAppUserService.findAppUserByUsername(username);
      // then
      expect(appUserRepoSpy).toBeCalledTimes(1);
      const expectedFindOptions: FindOneOptions<AppUser> = {
        where: {
          username: username,
        },
        select: ['userId', 'username', 'password', 'mail'],
      };
      expect(appUserRepoSpy).toBeCalledWith(expectedFindOptions);
    });
  });
});
