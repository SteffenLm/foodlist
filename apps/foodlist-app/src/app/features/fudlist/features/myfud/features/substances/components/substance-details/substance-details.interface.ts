import { Action } from '../../models/substance.enum';
import { ISubstance } from '../../models/substance.interface';

export interface ISubstanceDetailsData {
  action: Action;
  substance: ISubstance;
}

export interface IStaticTemplateValues {
  substanceTypeName: string;
  actionName: string;
}
