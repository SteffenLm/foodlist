export interface IGetRecipeOverviewDTO {
  recipeId: string;
  recipeName: string;
  recipeServings: number;
}

export interface IUpdateRecipeOverviewDTO {
  recipeId: string;
  recipeName: string;
  recipeServings: number;
}
