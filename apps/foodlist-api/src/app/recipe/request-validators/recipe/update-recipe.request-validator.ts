import { UpdateRecipeRequestDto } from '@foodlist/foodlist/dto-model';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeRequestValidator } from './create-recipe.request-validator';

export class UpdateRecipeRequestValidator
  extends PartialType(CreateRecipeRequestValidator)
  implements UpdateRecipeRequestDto {}
