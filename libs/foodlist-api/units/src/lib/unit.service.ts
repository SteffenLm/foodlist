import { Unit } from '@foodlist/foodlist-api/typeorm-entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>
  ) {}

  public async findUnitById(id: string): Promise<Unit> {
    return this.unitRepository.findOne({
      where: {
        unitId: id,
      },
    });
  }
}
