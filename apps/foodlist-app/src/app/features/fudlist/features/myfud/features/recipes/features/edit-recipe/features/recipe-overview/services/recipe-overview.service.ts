import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EditRecipeService } from '../../../services/edit-recipe.service';
import { IUpdateRecipeOverviewDTO } from '../models/recipe-overview.dto';
import { IRecipeOverview } from '../models/recipe-overview.model';
import { RecipeOverviewHttpService } from './recipe-overview-http.service';

@Injectable()
export class RecipeOverviewService {
  private recipeOverviewChanged = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly editRecipeService: EditRecipeService,
    private readonly recipeHttpService: RecipeOverviewHttpService
  ) {}

  public updateRecipeOverview(
    recipe: IUpdateRecipeOverviewDTO
  ): Observable<void> {
    return this.recipeHttpService.sendUpdateRecipeOverviewRequest(recipe);
  }

  public getRecipeOverView(): Observable<IRecipeOverview> {
    return this.recipeOverviewChanged.asObservable().pipe(
      map(() => this.editRecipeService.getRecipeId()),
      switchMap((recipeId) =>
        this.recipeHttpService.sendReadRecipeOverviewRequest(recipeId)
      ),
      map((rec) => {
        const recipeOverview: IRecipeOverview = {
          recipeId: +rec.recipeId,
          recipeName: rec.recipeName,
          recipeServings: rec.recipeServings,
        };
        return recipeOverview;
      })
    );
  }

  public recipeOverviewUpdated(): void {
    this.recipeOverviewChanged.next(true);
  }
}
