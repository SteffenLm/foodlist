import { AppUser, Recipe } from '@foodlist/foodlist-api/typeorm-entities';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeRequestValidator } from '../request-validators/recipe/create-recipe.request-validator';
import { UpdateRecipeRequestValidator } from '../request-validators/recipe/update-recipe.request-validator';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>
  ) {}

  public async createRecipe(
    createRecipeDTO: CreateRecipeRequestValidator,
    creatorUserId: string
  ): Promise<void> {
    const newRecipe = this.recipeRepository.create();
    newRecipe.recipeName = createRecipeDTO.recipeName;
    newRecipe.recipeName = createRecipeDTO.recipeName;
    newRecipe.recipeServings = createRecipeDTO.recipeServings;
    newRecipe.recipeCreator = {} as AppUser;
    newRecipe.recipeCreator.userId = creatorUserId;
    await this.recipeRepository.insert(newRecipe);
    return;
  }

  public async findAllRecipesByUserId(userId: string) {
    return this.recipeRepository.find({
      where: {
        recipeCreator: {
          userId: userId,
        },
      },
    });
  }

  public async findRecipeById(recipeId: string): Promise<Recipe> {
    return this.recipeRepository.findOne({
      where: {
        recipeId,
      },
      relations: [
        'recipeCreator',
        'recipeSubstances',
        'recipeSubstances.substanceUnit',
        'recipeSubstances.substance',
        'recipeSubstances.substance.substanceType',
        'recipeSteps',
      ],
    });
  }

  public async findRecipeOverviewById(recipeId: string): Promise<Recipe> {
    return this.recipeRepository.findOne({
      where: {
        recipeId,
      },
    });
  }

  public async updateRecipeById(
    recipeId: string,
    updateRecipeDto: UpdateRecipeRequestValidator
  ): Promise<void> {
    await this.recipeRepository.update(recipeId, updateRecipeDto);
    return;
  }

  public async userIsAllowedToEditRecipe(
    recipeId: string,
    userId: string
  ): Promise<boolean> {
    const recipe = await this.findRecipeById(recipeId);
    if (recipe.recipeCreator.userId === userId) {
      return true;
    } else {
      throw new ForbiddenException();
    }
  }
}
