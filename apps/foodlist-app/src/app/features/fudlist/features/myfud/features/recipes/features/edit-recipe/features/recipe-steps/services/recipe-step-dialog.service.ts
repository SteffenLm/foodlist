import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StepDialogComponent } from '../components/step-dialog/step-dialog.component';
import { StepDialogData } from '../components/step-dialog/step-dialog.interface';
import { OperationMode } from '../components/step/step.interfaces';
import { IRecipeStep } from '../model/recipe-step.model';
import { RecipeStepService } from './recipe-step.service';

@Injectable()
export class RecipeStepDialogService {
  constructor(
    private readonly matDialog: MatDialog,
    private readonly recipeStepService: RecipeStepService
  ) {}

  public openAddStepDialog(recipeId: string): void {
    const recipeStep: IRecipeStep = {
      recipeId: +recipeId,
      recipeStepId: '',
      stepInstruction: '',
      stepNumber: 1000,
    };
    this.matDialog.open<StepDialogComponent, StepDialogData>(
      StepDialogComponent,
      {
        panelClass: ['dialog-overlay'],
        maxWidth: '95vw',
        data: {
          operationMode: OperationMode.create,
          recipeStep,
        },
      }
    );
  }

  public openEditStepDialog(recipeStep: IRecipeStep): void {
    this.matDialog.open<StepDialogComponent, StepDialogData>(
      StepDialogComponent,
      {
        panelClass: ['dialog-overlay'],
        maxWidth: '95vw',
        data: {
          operationMode: OperationMode.edit,
          recipeStep,
        },
      }
    );
  }
}
