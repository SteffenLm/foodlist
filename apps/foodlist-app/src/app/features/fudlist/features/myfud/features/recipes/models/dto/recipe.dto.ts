import { IAppUserDTO } from '../../../../../../models/app-user.dto';
import { IRecipeStepDTO } from './recipe-step.dto';
import { IRecipeSubstanceDTO } from './recipe-substance.dto';

export interface IRecipeDetailDTO {
  recipeId: string;
  recipeName: string;
  recipeServings: number;
  recipeCreator: IAppUserDTO;
  recipeSteps: IRecipeStepDTO[];
  recipeSubstances: IRecipeSubstanceDTO[];
}
