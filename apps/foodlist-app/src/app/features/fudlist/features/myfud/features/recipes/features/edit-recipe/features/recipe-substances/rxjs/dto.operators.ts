import { OperatorFunction } from 'rxjs/internal/types';
import { map } from 'rxjs/operators';
import { Unit } from '../../../../../../../../../models/unit.model';
import { IGetRecipeSubstanceDTO } from '../model/recipe-substance.dto';
import { IRecipeSubstance } from '../model/recipe-substance.model';

export const mapRecipeSubstanceDtoToRecipeSubstanceInterface: OperatorFunction<
  IGetRecipeSubstanceDTO[],
  IRecipeSubstance[]
> = map<IGetRecipeSubstanceDTO[], IRecipeSubstance[]>((substanceDTOs) => {
  const recipeSubstances = substanceDTOs.map<IRecipeSubstance>(
    (substanceDTO) => {
      const recipeSubstance: IRecipeSubstance = {
        recipeId: substanceDTO.recipeId,
        substanceAmount: +substanceDTO.substanceAmount,
        substanceId: substanceDTO.substanceId,
        substanceName: substanceDTO.substance.substanceName,
        unit: substanceDTO.substanceUnit.unitId as Unit,
      };
      return recipeSubstance;
    }
  );
  return recipeSubstances;
});
