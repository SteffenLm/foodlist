import { Unit } from '../../../../../../../../../models/unit.model';

export interface IRecipeSubstance {
  recipeId: string;
  substanceId: string;
  substanceAmount: number;
  substanceName: string;
  unit: Unit;
}

export class RecipeSubstance implements IRecipeSubstance {
  constructor(
    public recipeId: string,
    public substanceId: string,
    public substanceAmount: number,
    public substanceName: string,
    public unit: Unit
  ) {}
}

export enum ChangeReason {
  create,
  read,
  update,
  delete,
}
