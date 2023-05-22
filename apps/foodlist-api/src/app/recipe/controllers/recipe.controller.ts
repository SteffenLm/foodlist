import { RequestUser, User } from '@foodlist/foodlist-api/auth';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRecipeRequestValidator } from '../request-validators/recipe/create-recipe.request-validator';
import { UpdateRecipeRequestValidator } from '../request-validators/recipe/update-recipe.request-validator';
import { RecipeService } from '../services/recipe.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Recipe } from '@foodlist/foodlist-api/typeorm-entities';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  public async createRecipe(
    @User() user: RequestUser,
    @Body() createRecipeDTO: CreateRecipeRequestValidator
  ): Promise<void> {
    await this.recipeService.createRecipe(createRecipeDTO, user.userId);
    return;
  }

  @Get()
  public async findAllRecipesByUserId(
    @User() user: RequestUser
  ): Promise<Recipe[]> {
    return await this.recipeService.findAllRecipesByUserId(user.userId);
  }

  @Get(':id')
  public async findRecipeById(
    @User() user: RequestUser,
    @Param('id') recipeId: string
  ): Promise<Recipe> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      return this.recipeService.findRecipeById(recipeId);
    } catch {
      throw new ForbiddenException();
    }
  }

  @Get(':id/overview')
  public async findRecipeOverviewById(
    @User() user: RequestUser,
    @Param('id') recipeId: string
  ): Promise<Recipe> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      return this.recipeService.findRecipeOverviewById(recipeId);
    } catch {
      throw new ForbiddenException();
    }
  }

  @Put(':id')
  public async updateRecipeById(
    @Param('id') recipeId: string,
    @User() user: RequestUser,
    @Body() updateRecipeDto: UpdateRecipeRequestValidator
  ): Promise<void> {
    try {
      await this.recipeService.userIsAllowedToEditRecipe(recipeId, user.userId);
      await this.recipeService.updateRecipeById(recipeId, updateRecipeDto);
      return;
    } catch {
      throw new ForbiddenException();
    }
  }
}
