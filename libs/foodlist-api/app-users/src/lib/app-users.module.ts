import { AppUser } from '@foodlist/foodlist-api/typeorm-entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserService } from './services/app-user.service';
import { PrivacyAppUserService } from './services/privacy-app-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppUser])],
  providers: [AppUserService, PrivacyAppUserService],
  exports: [AppUserService, PrivacyAppUserService],
})
export class AppUsersModule {}
