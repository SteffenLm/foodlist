import { IRecipeStep } from '../../model/recipe-step.model';
import { OperationMode } from '../step/step.interfaces';

export interface StepDialogData {
  operationMode: OperationMode;
  recipeStep: IRecipeStep;
}

export interface StepDialogClose {
  closeReason: CloseReason;
}

export enum CloseReason {
  create,
  update,
  abort,
  delete,
}
