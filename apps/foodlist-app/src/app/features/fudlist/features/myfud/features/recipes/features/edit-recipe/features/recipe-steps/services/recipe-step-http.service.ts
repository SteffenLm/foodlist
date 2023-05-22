import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../../../../../environments/environment';
import {
  ICreateRecipeStepDTO,
  IGetRecipeStepDTO,
  IUpdateRecipeStepDTO,
  IUpdateRecipeStepOrderDTO,
} from '../model/recipe-step.dto';

@Injectable()
export class RecipeStepHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public sendCreateRecipeStepRequest(
    recipeId: string,
    step: ICreateRecipeStepDTO
  ): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/steps`,
      step
    );
  }

  public sendReadRecipeStepRequest(
    recipeId: string
  ): Observable<IGetRecipeStepDTO[]> {
    return this.httpClient.get<IGetRecipeStepDTO[]>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/steps/`
    );
  }

  public sendUpdateRecipeStepRequest(
    recipeId: string,
    recipeStepId: string,
    step: IUpdateRecipeStepDTO
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/steps/${recipeStepId}`,
      step
    );
  }

  public sendDeleteRecipeStepRequest(
    recipeId: string,
    recipeStepId: string
  ): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/steps/${recipeStepId}`
    );
  }

  public sendUpdateRecipeStepOrderRequest(
    recipeId: string,
    recipeSteps: IUpdateRecipeStepOrderDTO
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.foodlistApiUrl}/recipes/${recipeId}/steps/changeorder`,
      recipeSteps
    );
  }
}
