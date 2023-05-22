import { Unit } from '@foodlist/foodlist-api/typeorm-entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitService } from './unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [UnitService],
  exports: [UnitService],
})
export class UnitsModule {}
