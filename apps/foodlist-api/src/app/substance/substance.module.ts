import { AppUsersModule } from '@foodlist/foodlist-api/app-users';
import {
  Substance,
  SubstanceType,
  Unit,
} from '@foodlist/foodlist-api/typeorm-entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitsModule } from '@foodlist/foodlist-api/units';
import { SubstanceController } from './controllers/substance.controller';
import { SubstanceTypeService } from './services/substance-type.service';
import { SubstanceService } from './services/substance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubstanceType, Substance, Unit]),
    UnitsModule,
    AppUsersModule,
  ],
  controllers: [SubstanceController],
  providers: [SubstanceService, SubstanceTypeService],
})
export class SubstanceModule {}
