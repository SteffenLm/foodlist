import { UpdateRecipeSubstanceRequestDto } from '@foodlist/foodlist/dto-model';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeSubstanceRequestValidator } from './create-recipe-substance.request-validator';

export class UpdateRecipeSubstanceRequestValidator
  extends PartialType(CreateRecipeSubstanceRequestValidator)
  implements UpdateRecipeSubstanceRequestDto {}
