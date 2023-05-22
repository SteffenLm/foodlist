import { OperationMode } from '../../../recipe-steps/components/step/step.interfaces';
import { IRecipeSubstance } from '../../model/recipe-substance.model';
export interface IRecipeSubstanceDialogData {
  recipeId: string;
  recipeSubstance: IRecipeSubstance;
  operationMode: OperationMode;
}

export interface IRecipeSubstanceDialogClose {
  closeReason: CloseReason;
}

export enum CloseReason {
  create,
  update,
  abort,
  delete,
}
