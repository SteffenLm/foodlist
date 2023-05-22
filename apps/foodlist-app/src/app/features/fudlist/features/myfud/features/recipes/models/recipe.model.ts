import { Unit } from '../../../../../models/unit.model';
import { ISubstance } from '../../substances/models/substance.interface';

export interface IRecipe {
  recipeId: number;
  recipeName: string;
  servings: number;
  containedSubstances: ISubstanceEntry[];
  cookingSteps: ICookingStep[];
}

export interface ISubstanceEntry {
  amount: number;
  unit: Unit;
  substance: ISubstance;
}

export interface ICookingStep {
  instruction: string;
  stepNumber: number;
  usedSubstances: ISubstance[];
}
