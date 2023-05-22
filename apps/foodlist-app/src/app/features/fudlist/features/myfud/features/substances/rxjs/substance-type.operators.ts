import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs/internal/types';
import { map, switchMap } from 'rxjs/operators';
import { SubstanceType } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';
import { SubstanceService } from '../services/substance.service';

export const mapSubstanceTypeToSubstanceTypeName: OperatorFunction<
  SubstanceType,
  string
> = map<SubstanceType, string>((substanceType) => {
  if (substanceType === SubstanceType.ingredient) {
    return 'Zutat';
  } else {
    return 'Gewürz';
  }
});

export const mapSubstanceTypeToSubstances = (
  substanceService: SubstanceService
) =>
  switchMap<SubstanceType, Observable<ISubstance[]>>((substanceType) => {
    if (substanceType === SubstanceType.ingredient) {
      return substanceService.getIngredients();
    } else {
      return substanceService.getSpices();
    }
  });
