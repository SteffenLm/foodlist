import { UpdateRecipeStepRequestDto } from '@foodlist/foodlist/dto-model';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeStepRequestValidator } from './create-recipe-step.request-validator';

export class UpdateRecipeStepRequestValidator
  extends PartialType(CreateRecipeStepRequestValidator)
  implements UpdateRecipeStepRequestDto {}
