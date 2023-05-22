import { CreateRecipeRequestDto } from '@foodlist/foodlist/dto-model';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateRecipeRequestValidator implements CreateRecipeRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  recipeName: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  recipeServings: number;
}
