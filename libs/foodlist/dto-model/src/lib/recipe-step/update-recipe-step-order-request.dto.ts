export interface UpdateRecipeStepOrderRequestDto {
  steps: {
    recipeStepId: string;
    stepNumber: number;
  }[];
}
