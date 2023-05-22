import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperationMode } from '../../recipe-steps/components/step/step.interfaces';
import { SubstanceDialogComponent } from '../components/substance-dialog/substance-dialog.component';
import { IRecipeSubstanceDialogData } from '../components/substance-dialog/substance-dialog.interface';
import { IRecipeSubstance } from '../model/recipe-substance.model';
import { RecipeSubstanceFactory } from './recipe-substance-factory';

@Injectable()
export class RecipeSubstanceDialogService {
  constructor(
    private readonly matDialog: MatDialog,
    private readonly recipeSubstanceFactory: RecipeSubstanceFactory
  ) {}

  public openAddSubstanceDialog(recipeId: string): void {
    const dialogData: IRecipeSubstanceDialogData = {
      operationMode: OperationMode.create,
      recipeId,
      recipeSubstance: this.recipeSubstanceFactory.create(),
    };
    this.matDialog.open<SubstanceDialogComponent, IRecipeSubstanceDialogData>(
      SubstanceDialogComponent,
      {
        panelClass: ['dialog-overlay'],
        maxWidth: '95vw',
        data: dialogData,
      }
    );
  }

  public openEditSubstanceDialog(
    recipeId: string,
    recipeSubstance: IRecipeSubstance
  ): void {
    const dialogData: IRecipeSubstanceDialogData = {
      operationMode: OperationMode.edit,
      recipeId,
      recipeSubstance,
    };

    this.matDialog.open<SubstanceDialogComponent, IRecipeSubstanceDialogData>(
      SubstanceDialogComponent,
      {
        panelClass: ['dialog-overlay'],
        maxWidth: '95vw',
        data: dialogData,
      }
    );
  }
}
