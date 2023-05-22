import { CreateSubstanceRequestDto } from '@foodlist/foodlist/dto-model';
import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';

export class CreateSubstance implements CreateSubstanceRequestDto {
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true })
  substanceTypeId: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  substanceName: string;

  @IsNumberString({ no_symbols: true })
  substanceDefaultUnitId: string;
}
