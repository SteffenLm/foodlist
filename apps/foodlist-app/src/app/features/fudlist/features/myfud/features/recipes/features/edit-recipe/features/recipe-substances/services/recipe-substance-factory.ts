import { Injectable } from '@angular/core';
import { Unit } from '../../../../../../../../../models/unit.model';
import { IRecipeSubstance } from '../model/recipe-substance.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeSubstanceFactory {
  create(): IRecipeSubstance {
    return {
      recipeId: '',
      substanceId: '',
      substanceAmount: 0,
      substanceName: '',
      unit: Unit.none,
    };
  }
}
