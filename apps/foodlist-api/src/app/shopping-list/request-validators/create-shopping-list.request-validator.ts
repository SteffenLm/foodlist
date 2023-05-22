import { CreateShoppingListRequestDto } from '@foodlist/foodlist/dto-model';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShoppingListRequestValidator
  implements CreateShoppingListRequestDto
{
  @IsNotEmpty()
  @IsString()
  shoppingListName: string;
}
