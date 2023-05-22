import { RecipeSubstance } from '@foodlist/foodlist-api/typeorm-entities';
import { UnitService } from '@foodlist/foodlist-api/units';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeSubstanceRequestValidator } from '../request-validators/recipe-substance/create-recipe-substance.request-validator';
import { UpdateRecipeSubstanceRequestValidator } from '../request-validators/recipe-substance/update-recipe-substance.request-validator';

@Injectable()
export class RecipeSubstanceService {
  constructor(
    private readonly unitService: UnitService,
    @InjectRepository(RecipeSubstance)
    private readonly recipeSubstanceRepository: Repository<RecipeSubstance>
  ) {}

  public async addSubstanceToRecipe(
    recipeId: string,
    createRecipeSubstanceDTO: CreateRecipeSubstanceRequestValidator
  ): Promise<void> {
    const recipeSubstance = this.recipeSubstanceRepository.create();
    recipeSubstance.recipeId = recipeId;
    recipeSubstance.substanceId = createRecipeSubstanceDTO.substanceId;
    recipeSubstance.substanceAmount = createRecipeSubstanceDTO.substanceAmount;
    recipeSubstance.substanceUnit = await this.unitService.findUnitById(
      createRecipeSubstanceDTO.substanceUnit
    );
    await this.recipeSubstanceRepository.insert(recipeSubstance);
    return;
  }

  public async findAllSubstancesByRecipeId(
    recipeId: string
  ): Promise<RecipeSubstance[]> {
    return await this.recipeSubstanceRepository.find({
      relations: ['substance', 'substanceUnit'],
      where: {
        recipeId: recipeId,
      },
    });
  }

  public async updateSubstanceOfRecipeById(
    recipeId: string,
    updateRecipeDto: UpdateRecipeSubstanceRequestValidator
  ): Promise<void> {
    const recipeSubstance = this.recipeSubstanceRepository.create();
    recipeSubstance.recipeId = recipeId;
    recipeSubstance.substanceId = updateRecipeDto.substanceId;
    recipeSubstance.substanceAmount = updateRecipeDto.substanceAmount;
    recipeSubstance.substanceUnit = await this.unitService.findUnitById(
      updateRecipeDto.substanceUnit
    );
    await this.recipeSubstanceRepository.update(
      { recipeId: recipeId, substanceId: updateRecipeDto.substanceId },
      recipeSubstance
    );
    return;
  }

  public async deleteSubstanceFromRecipe(
    recipeId: string,
    substanceId: string
  ): Promise<void> {
    await this.recipeSubstanceRepository.delete({
      recipeId: recipeId,
      substanceId: substanceId,
    });
    return;
  }
}
