import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EditRecipeService } from '../../../services/edit-recipe.service';
import {
  ChangeReason,
  IRecipeSubstance,
} from '../model/recipe-substance.model';
import { mapRecipeSubstanceDtoToRecipeSubstanceInterface } from '../rxjs/dto.operators';
import { RecipeSubstanceHttpService } from './recipe-substance-http.service';

@Injectable()
export class RecipeSubstanceService {
  private recipeSubstancesChanged = new BehaviorSubject<ChangeReason>(
    ChangeReason.read
  );

  constructor(
    private readonly editRecipeService: EditRecipeService,
    private readonly recipeSubstanceHttpService: RecipeSubstanceHttpService
  ) {}

  public getRecipeSubstances(): Observable<IRecipeSubstance[]> {
    return this.recipeSubstancesChanged.asObservable().pipe(
      map(() => this.editRecipeService.getRecipeId()),
      switchMap((recipeId) =>
        this.recipeSubstanceHttpService.sendReadRecipeSubstanceRequest(recipeId)
      ),
      mapRecipeSubstanceDtoToRecipeSubstanceInterface
    );
  }

  public substanceCreated(): void {
    this.recipeSubstancesChanged.next(ChangeReason.create);
  }

  public substanceUpdated(): void {
    this.recipeSubstancesChanged.next(ChangeReason.update);
  }

  public substanceDeleted(): void {
    this.recipeSubstancesChanged.next(ChangeReason.delete);
  }
}
