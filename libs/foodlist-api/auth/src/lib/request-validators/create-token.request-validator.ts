import { CreateTokenRequestDto } from '@foodlist/foodlist/dto-model';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
export const PasswordRegularExpression =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export class CreateTokenRequestValidator implements CreateTokenRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(PasswordRegularExpression, {
    message: 'Password does not match RegExp',
  })
  password: string;
}
