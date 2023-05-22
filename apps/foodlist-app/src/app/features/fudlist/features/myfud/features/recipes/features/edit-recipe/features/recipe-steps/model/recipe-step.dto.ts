export interface ICreateRecipeStepDTO {
  stepInstruction: string;
  stepNumber: number;
}

export interface IUpdateRecipeStepDTO {
  stepInstruction?: string;
  stepNumber?: number;
}

export interface IUpdateRecipeStepOrderDTO {
  steps: IStepOrder[];
}

interface IStepOrder {
  stepNumber: number;
  recipeStepId: string;
}

export interface IGetRecipeStepDTO {
  recipeStepId: string;
  recipeId: number;
  stepInstruction: string;
  stepNumber: number;
}
