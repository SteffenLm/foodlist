import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../../../../../environments/environment';
import {
  ICreateRecipeSubstanceDTO,
  IGetRecipeSubstanceDTO,
  IUpdateRecipeSubstanceDTO,
} from '../model/recipe-substance.dto';

@Injectable()
export class RecipeSubstanceHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public sendCreateRecipeSubstanceRequest(
    recipeId: string,
    substance: ICreateRecipeSubstanceDTO
  ): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/substances`,
      substance
    );
  }

  public sendReadRecipeSubstanceRequest(
    recipeId: string
  ): Observable<IGetRecipeSubstanceDTO[]> {
    return this.httpClient.get<IGetRecipeSubstanceDTO[]>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/substances/`
    );
  }

  public sendUpdateRecipeSubstanceRequest(
    recipeId: string,
    substanceId: string,
    body: IUpdateRecipeSubstanceDTO
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/substances/${substanceId}`,
      body
    );
  }

  public sendDeleteRecipeSubstanceRequest(
    recipeId: string,
    substanceId: string
  ): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/substances/${substanceId}`
    );
  }
}
