import { AppUser } from '@foodlist/foodlist-api/typeorm-entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppUserService {
  constructor(
    @InjectRepository(AppUser)
    private readonly appUserRepository: Repository<AppUser>
  ) {}

  public async findAppUserByUsername(username: string): Promise<AppUser> {
    return this.appUserRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  public async findAppUserById(userId: string) {
    this.appUserRepository.findOne({
      where: {
        userId,
      },
    });
  }
}
