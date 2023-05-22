import { OperatorFunction } from 'rxjs/internal/types';
import { map } from 'rxjs/operators';
import { SubstanceType } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';

export const filterOnlyIngredients: OperatorFunction<
  ISubstance[],
  ISubstance[]
> = map<ISubstance[], ISubstance[]>((substances) =>
  substances.filter((substance) => substance.type === SubstanceType.ingredient)
);

export const filterOnlySpices: OperatorFunction<ISubstance[], ISubstance[]> =
  map<ISubstance[], ISubstance[]>((substances) =>
    substances.filter((substance) => substance.type === SubstanceType.spice)
  );
