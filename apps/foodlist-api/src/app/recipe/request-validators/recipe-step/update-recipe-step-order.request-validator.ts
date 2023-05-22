import { UpdateRecipeStepOrderRequestDto } from '@foodlist/foodlist/dto-model';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class UpdateRecipeStepOrderRequestValidator
  implements UpdateRecipeStepOrderRequestDto
{
  @ValidateNested()
  steps: Step[];
}

class Step {
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true })
  recipeStepId: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  stepNumber: number;
}
