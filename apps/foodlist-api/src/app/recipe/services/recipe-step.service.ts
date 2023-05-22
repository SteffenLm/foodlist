import { RecipeStep } from '@foodlist/foodlist-api/typeorm-entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeStepRequestValidator } from '../request-validators/recipe-step/create-recipe-step.request-validator';
import { UpdateRecipeStepRequestValidator } from '../request-validators/recipe-step/update-recipe-step.request-validator';

@Injectable()
export class RecipeStepService {
  constructor(
    @InjectRepository(RecipeStep)
    private readonly recipeStepRepository: Repository<RecipeStep>
  ) {}

  public async addStepToRecipe(
    recipeId: string,
    udpateRecipeStepDTO: CreateRecipeStepRequestValidator
  ): Promise<void> {
    const recipeStep = this.recipeStepRepository.create();
    recipeStep.recipeId = recipeId;
    recipeStep.stepInstruction = udpateRecipeStepDTO.stepInstruction;
    recipeStep.stepNumber = udpateRecipeStepDTO.stepNumber;
    await this.recipeStepRepository.insert(recipeStep);
    return;
  }

  public async findAllStepsByRecipeId(recipeId: string): Promise<RecipeStep[]> {
    return await this.recipeStepRepository.find({
      where: {
        recipeId: recipeId,
      },
      order: {
        stepNumber: 'ASC',
      },
    });
  }

  public async updateRecipeStepById(
    stepId: string,
    updateRecipeStepDto: UpdateRecipeStepRequestValidator
  ): Promise<void> {
    await this.recipeStepRepository.update(
      { recipeStepId: stepId },
      updateRecipeStepDto
    );
    return;
  }

  public async deleteRecipeStepById(stepId: string): Promise<void> {
    await this.recipeStepRepository.delete({ recipeStepId: stepId });
    return;
  }

  public async saveRecipes(recipeSteps: RecipeStep[]) {
    await this.recipeStepRepository.save(recipeSteps);
  }
}
