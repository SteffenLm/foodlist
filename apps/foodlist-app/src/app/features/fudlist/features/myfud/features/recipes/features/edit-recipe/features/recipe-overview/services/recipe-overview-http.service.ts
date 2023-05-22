import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../../../../../environments/environment';
import {
  IGetRecipeOverviewDTO,
  IUpdateRecipeOverviewDTO,
} from '../models/recipe-overview.dto';

@Injectable()
export class RecipeOverviewHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public sendReadRecipeOverviewRequest(
    recipeId: string
  ): Observable<IGetRecipeOverviewDTO> {
    return this.httpClient.get<IGetRecipeOverviewDTO>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/overview`
    );
  }

  public sendUpdateRecipeOverviewRequest(
    recipe: IUpdateRecipeOverviewDTO
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.foodlistApiUrl}/recipes/${recipe.recipeId}`,
      recipe
    );
  }
}
