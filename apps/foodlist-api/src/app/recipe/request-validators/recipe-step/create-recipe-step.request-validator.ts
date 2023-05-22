import { CreateRecipeStepRequestDto } from '@foodlist/foodlist/dto-model';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateRecipeStepRequestValidator
  implements CreateRecipeStepRequestDto
{
  @IsNotEmpty()
  @IsString()
  @Length(3)
  stepInstruction: string;

  @IsPositive()
  @IsNumber()
  stepNumber: number;
}
