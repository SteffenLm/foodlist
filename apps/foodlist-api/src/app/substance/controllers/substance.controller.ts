import { RequestUser, User } from '@foodlist/foodlist-api/auth';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSubstance } from '../dto/create-substance.dto';
import { UpdateSubstance } from '../dto/update-substance.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Substance } from '@foodlist/foodlist-api/typeorm-entities';

import { SubstanceService } from '../services/substance.service';

@Controller('substances')
export class SubstanceController {
  constructor(private readonly substanceService: SubstanceService) {}

  @Post()
  public async createSubstance(
    @User() user: RequestUser,
    @Body() createSubstanceDTO: CreateSubstance
  ): Promise<void> {
    try {
      await this.substanceService.createSubstance(
        createSubstanceDTO,
        user.userId
      );
      return Promise.resolve();
    } catch {
      return Promise.reject();
    }
  }

  @Get()
  public async getAllSubstances(
    @User() user: RequestUser
  ): Promise<Substance[]> {
    const publicSubstances =
      await this.substanceService.findAllPublicSubstances();
    const userSubstances =
      await this.substanceService.findAllSubstancesByUserId(user.userId);
    return publicSubstances.concat(...userSubstances);
  }

  @Put(':id')
  public async updateSubstance(
    @Param('id') id: string,
    @Body() updateSubstanceDTO: UpdateSubstance
  ): Promise<void> {
    return this.substanceService.updateSubstance(id, updateSubstanceDTO);
  }
}
