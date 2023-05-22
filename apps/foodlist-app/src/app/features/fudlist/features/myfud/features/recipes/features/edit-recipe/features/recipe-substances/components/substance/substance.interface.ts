import { Unit } from '../../../../../../../../../../models/unit.model';
import { ISubstance } from '../../../../../../../substances/models/substance.interface';

export interface IRecipeSubstanceFormData {
  substance: ISubstance;
  amount: number;
  unit: Unit;
}
