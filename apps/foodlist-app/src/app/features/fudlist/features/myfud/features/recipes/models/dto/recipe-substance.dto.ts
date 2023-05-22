import { ISubstanceTypeDTO } from '../../../../../../models/substance-type.dto';
import { IUnitDTO } from '../../../../../../models/unit.dto';

export interface IRecipeSubstanceDTO {
  recipeId: string;
  substanceId: string;
  substanceAmount: string;
  substance: ISubstanceDTO;
  substanceUnit: IUnitDTO;
}

interface ISubstanceDTO {
  substanceId: string;
  substanceName: string;
  substanceType: ISubstanceTypeDTO;
}
