import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../environments/environment';
import { IRecipeDetailDTO } from '../models/dto/recipe.dto';
import { ICreateRecipeDTO, IRecipeDTO } from '../models/recipe.dto';

@Injectable()
export class RecipeHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public sendGetRecipesRequest(): Observable<IRecipeDTO[]> {
    return this.httpClient.get<IRecipeDTO[]>(
      `${environment.foodlistApiUrl}/recipes`
    );
  }

  public sendCreateRecipeRequest(recipe: ICreateRecipeDTO): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.foodlistApiUrl}/recipes`,
      recipe
    );
  }

  public sendGetRecipeDetailRequest(
    recipeId: string
  ): Observable<IRecipeDetailDTO> {
    return this.httpClient.get<IRecipeDetailDTO>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}`
    );
  }
}
