import { CreateRecipeSubstanceRequestDto } from '@foodlist/foodlist/dto-model';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
} from 'class-validator';

export class CreateRecipeSubstanceRequestValidator
  implements CreateRecipeSubstanceRequestDto
{
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true })
  substanceId: string;

  @IsNumberString({ no_symbols: true })
  substanceUnit: string;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  substanceAmount: number;
}
