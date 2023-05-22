import { Substance } from '@foodlist/foodlist-api/typeorm-entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubstance } from '../dto/create-substance.dto';
import { UpdateSubstance } from '../dto/update-substance.dto';

@Injectable()
export class SubstanceService {
  constructor(
    @InjectRepository(Substance)
    private readonly substanceRepository: Repository<Substance>
  ) {}

  public async createSubstance(
    createSubstanceDTO: CreateSubstance,
    creatorUserId: string
  ): Promise<void> {
    const newSubstance = this.substanceRepository.create({
      substanceName: createSubstanceDTO.substanceName,
      substanceDefaultUnit: {
        unitId: createSubstanceDTO.substanceDefaultUnitId,
      },
      substanceCreator: {
        userId: creatorUserId,
      },
      substanceType: {
        substanceTypeId: createSubstanceDTO.substanceTypeId,
      },
    });
    await this.substanceRepository.insert(newSubstance);
    return;
  }

  async findAllPublicSubstances() {
    return this.findAllSubstancesByUserId(
      '00000000-0000-0000-0000-000000000001'
    );
  }

  public async findAllSubstancesByUserId(userId: string) {
    return this.substanceRepository.find({
      where: {
        substanceCreator: {
          userId: userId,
        },
      },
      relations: ['substanceDefaultUnit', 'substanceCreator', 'substanceType'],
    });
  }

  public async updateSubstance(
    substanceId: string,
    updateSubstanceDTO: UpdateSubstance
  ): Promise<void> {
    const substance = this.substanceRepository.create({
      substanceName: updateSubstanceDTO.substanceName,
      substanceDefaultUnit: {
        unitId: updateSubstanceDTO.substanceDefaultUnitId,
      },
    });
    await this.substanceRepository.update(substanceId, substance);
    return;
  }
}
