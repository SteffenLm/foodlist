import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip, switchMap, tap } from 'rxjs/operators';
import { ChangeReason } from '../../substances/models/substance.enum';
import { IRecipeDetailDTO } from '../models/dto/recipe.dto';
import { ICreateRecipeDTO, IRecipeDTO } from '../models/recipe.dto';
import { RecipeHttpService } from './recipe-http.service';

@Injectable()
export class RecipeService {
  private recipeChanged = new BehaviorSubject<string>('');
  private recipe = new BehaviorSubject<IRecipeDetailDTO>({
    recipeId: '',
    recipeCreator: {
      userId: '',
    },
    recipeName: '',
    recipeServings: 0,
    recipeSteps: [],
    recipeSubstances: [],
  });

  private recipesChanged = new BehaviorSubject<ChangeReason>(ChangeReason.read);
  private recipes = new BehaviorSubject<IRecipeDTO[]>([]);

  constructor(private readonly recipeHttpService: RecipeHttpService) {
    this.recipesChanged
      .pipe(switchMap(() => this.recipeHttpService.sendGetRecipesRequest()))
      .subscribe((data) => {
        this.emitRecipes(data);
      });
    this.recipeChanged
      .pipe(
        skip(1),
        switchMap((recipeId) =>
          this.recipeHttpService.sendGetRecipeDetailRequest(recipeId)
        )
      )
      .subscribe((data) => {
        this.recipe.next(data);
      });
  }

  public getRecipesData(): Observable<IRecipeDTO[]> {
    return this.recipes.asObservable();
  }

  public sendCreateRecipeRequest(recipe: ICreateRecipeDTO): Observable<void> {
    return this.recipeHttpService.sendCreateRecipeRequest(recipe).pipe(
      tap(() => {
        this.emitRecipeIsCreated();
      })
    );
  }

  public getRecipe(): Observable<IRecipeDetailDTO> {
    return this.recipe.asObservable();
  }

  public setChangedRecipe(recipeId: string) {
    this.recipeChanged.next(recipeId);
  }

  private emitRecipeIsCreated(): void {
    this.recipesChanged.next(ChangeReason.create);
  }

  private emitRecipes(recipes: IRecipeDTO[]): void {
    this.recipes.next(recipes);
  }
}
