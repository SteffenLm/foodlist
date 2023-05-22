export interface IRecipeStep {
  recipeStepId: string;
  recipeId: number;
  stepInstruction: string;
  stepNumber: number;
}

export enum ChangeReason {
  create,
  read,
  update,
  delete,
}
