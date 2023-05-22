import { RequestUser, User } from '@foodlist/foodlist-api/auth';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRecipeStepRequestValidator } from '../request-validators/recipe-step/create-recipe-step.request-validator';
import { UpdateRecipeStepRequestValidator } from '../request-validators/recipe-step/update-recipe-step.request-validator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RecipeStep } from '@foodlist/foodlist-api/typeorm-entities';
import { UpdateRecipeStepOrderRequestValidator } from '../request-validators/recipe-step/update-recipe-step-order.request-validator';
import { RecipeStepService } from '../services/recipe-step.service';
import { RecipeService } from '../services/recipe.service';

@Controller('recipes/:recipeid/steps')
export class RecipeStepController {
  constructor(
    private readonly recipeStepService: RecipeStepService,
    private readonly recipeService: RecipeService
  ) {}

  @Put('/changeorder')
  public async updateStepOrderOfRecipeByRecipeStep(
    @User() user: RequestUser,
    @Param('recipeid') recipeId: string,
    @Body() updateRecipeStepOrderDTO: UpdateRecipeStepOrderRequestValidator
  ): Promise<void> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      const recipeSteps = await this.recipeStepService.findAllStepsByRecipeId(
        recipeId
      );
      updateRecipeStepOrderDTO.steps.forEach((dto) => {
        const rec = recipeSteps.find(
          (step) => step.recipeStepId === dto.recipeStepId
        );
        rec.stepNumber = dto.stepNumber;
      });
      await this.recipeStepService.saveRecipes(recipeSteps);
      return;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Post()
  public async addStepToRecipe(
    @User() user: RequestUser,
    @Param('recipeid') recipeId: string,
    @Body() createRecipeStepDTO: CreateRecipeStepRequestValidator
  ): Promise<void> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      await this.recipeStepService.addStepToRecipe(
        recipeId,
        createRecipeStepDTO
      );
      return;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Get()
  public async findAllStepsByRecipeId(
    @User() user: RequestUser,
    @Param('recipeid') recipeId
  ): Promise<RecipeStep[]> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      const recipeSteps = await this.recipeStepService.findAllStepsByRecipeId(
        recipeId
      );
      return recipeSteps;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Put(':id')
  public async updateStepOfRecipeByRecipeStepId(
    @User() user: RequestUser,
    @Param('recipeid') recipeId: string,
    @Param('id') stepId: string,
    @Body() updateRecipeStepDto: UpdateRecipeStepRequestValidator
  ): Promise<void> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      await this.recipeStepService.updateRecipeStepById(
        stepId,
        updateRecipeStepDto
      );
      return;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Delete(':id')
  public async deleteRecipeStepById(
    @User() user: RequestUser,
    @Param('recipeid') recipeId: string,
    @Param('id') stepId: string
  ): Promise<void> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      await this.recipeStepService.deleteRecipeStepById(stepId);
      return;
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
