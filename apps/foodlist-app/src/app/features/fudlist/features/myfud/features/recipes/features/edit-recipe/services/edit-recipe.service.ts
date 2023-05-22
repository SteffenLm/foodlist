import { Injectable } from '@angular/core';

@Injectable()
export class EditRecipeService {
  private recipeId = '';

  public setRecipeId(recipeId: string) {
    this.recipeId = recipeId;
  }

  public getRecipeId(): string {
    return this.recipeId;
  }
}
