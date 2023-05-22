import { RequestUser, User } from '@foodlist/foodlist-api/auth';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRecipeSubstanceRequestValidator } from '../request-validators/recipe-substance/create-recipe-substance.request-validator';
import { UpdateRecipeSubstanceRequestValidator } from '../request-validators/recipe-substance/update-recipe-substance.request-validator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RecipeSubstance } from '@foodlist/foodlist-api/typeorm-entities';
import { RecipeSubstanceService } from '../services/recipe-substance.service';
import { RecipeService } from '../services/recipe.service';

@Controller('recipes/:recipeid/substances')
export class RecipeSubstanceController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly recipeSubstanceService: RecipeSubstanceService
  ) {}

  @Post()
  public async addSubstanceToRecipe(
    @User() user: RequestUser,
    @Param('recipeid') recipeId,
    @Body() createRecipeSubstanceDTO: CreateRecipeSubstanceRequestValidator
  ): Promise<void> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      await this.recipeSubstanceService.addSubstanceToRecipe(
        recipeId,
        createRecipeSubstanceDTO
      );
      return;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException();
      } else {
        throw new BadRequestException('Substance already added');
      }
    }
  }

  @Get()
  public async findAllSubstancesByRecipeId(
    @User() user: RequestUser,
    @Param('recipeid') recipeId
  ): Promise<RecipeSubstance[]> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      return await this.recipeSubstanceService.findAllSubstancesByRecipeId(
        recipeId
      );
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Put(':id')
  public async updateSubstanceOfRecipeById(
    @User() user: RequestUser,
    @Param('recipeid') recipeId: string,
    @Param('id') substanceId: string,
    @Body() updateRecipeDto: UpdateRecipeSubstanceRequestValidator
  ): Promise<void> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      updateRecipeDto.substanceId = substanceId;
      await this.recipeSubstanceService.updateSubstanceOfRecipeById(
        recipeId,
        updateRecipeDto
      );
      return;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Delete(':id')
  public async deleteSubstanceFromRecipe(
    @User() user: RequestUser,
    @Param('recipeid') recipeId: string,
    @Param('id') substanceId: string
  ): Promise<void> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      await this.recipeSubstanceService.deleteSubstanceFromRecipe(
        recipeId,
        substanceId
      );
      return;
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
