export interface IRecipeDTO {
  recipeId: string;
  recipeName: string;
  recipeServings: number;
}

export interface ICreateRecipeDTO {
  recipeName: string;
  recipeServings: number;
}

export interface IRecipeDetailDTO {
  recipeId: string;
  recipeName: string;
  recipeServings: number;
  recipeSubstances: IRecipeSubstance[];
}
export interface IRecipeSubstance {
  recipeId: string;
  substanceId: string;
  substanceAmount: string;
  substanceUnit: {
    unitId: string;
    unitName: string;
  };
  substance: {
    substanceId: string;
    substanceName: string;
  };
}
