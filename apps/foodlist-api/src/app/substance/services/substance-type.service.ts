import { SubstanceType } from '@foodlist/foodlist-api/typeorm-entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubstanceTypeService {
  constructor(
    @InjectRepository(SubstanceType)
    private readonly substanceTypeRepository: Repository<SubstanceType>
  ) {}

  public async findSubstanceTypeById(id: string): Promise<SubstanceType> {
    return this.substanceTypeRepository.findOne({
      where: {
        substanceTypeId: id,
      },
    });
  }
}
