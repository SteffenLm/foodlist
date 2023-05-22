import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecipeComponent } from '../components/create-recipe/create-recipe.component';

@Injectable()
export class RecipeDialogService {
  constructor(private readonly matDialog: MatDialog) {}

  public openCreateRecipeDialog(): void {
    this.matDialog.open<CreateRecipeComponent>(CreateRecipeComponent, {
      panelClass: ['dialog-overlay'],
      maxWidth: '95vw',
    });
  }
}
