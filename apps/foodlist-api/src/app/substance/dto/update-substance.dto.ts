import { UpdateSubstanceRequestDto } from '@foodlist/foodlist/dto-model';
import { PartialType } from '@nestjs/mapped-types';
import { CreateSubstance } from './create-substance.dto';

export class UpdateSubstance
  extends PartialType(CreateSubstance)
  implements UpdateSubstanceRequestDto {}
