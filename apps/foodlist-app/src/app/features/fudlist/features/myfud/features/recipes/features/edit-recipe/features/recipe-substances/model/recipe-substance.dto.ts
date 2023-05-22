export interface ICreateRecipeSubstanceDTO {
  substanceId: string;
  substanceUnit: string;
  substanceAmount: number;
}

export interface IUpdateRecipeSubstanceDTO {
  substanceUnit: string;
  substanceAmount: number;
}

export interface IGetRecipeSubstanceDTO {
  recipeId: string;
  substanceId: string;
  substanceAmount: string;
  substance: {
    substanceId: string;
    substanceName: string;
  };
  substanceUnit: {
    unitId: string;
    unitName: string;
  };
}
