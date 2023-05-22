import { Unit } from '../../../../../models/unit.model';
import { SubstanceType } from './substance.enum';

export interface ISubstance {
  substanceId: string;
  substanceName: string;
  type: SubstanceType;
  defaultUnit: Unit;
}
