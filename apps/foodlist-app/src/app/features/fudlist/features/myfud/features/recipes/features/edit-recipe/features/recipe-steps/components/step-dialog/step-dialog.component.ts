import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { delay, filter, switchMap, tap } from 'rxjs/operators';
import { SnackBarService } from '../../../../../../../../../../../core/services/snack-bar.service';
import {
  ICreateRecipeStepDTO,
  IUpdateRecipeStepDTO,
} from '../../model/recipe-step.dto';
import { RecipeStepHttpService } from '../../services/recipe-step-http.service';
import { RecipeStepService } from '../../services/recipe-step.service';
import { StepComponent } from '../step/step.component';
import { AddStepFormData, OperationMode } from '../step/step.interfaces';
import {
  CloseReason,
  StepDialogClose,
  StepDialogData,
} from './step-dialog.interface';

@Component({
  selector: 'foodlist-add-step-dialog',
  templateUrl: './step-dialog.component.html',
  styleUrls: ['./step-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [StepComponent],
})
export class StepDialogComponent {
  public loading = false;
  public operationMode: OperationMode = OperationMode.create;
  public initialData: AddStepFormData = {
    instruction: '',
  };

  private recipeId = 0;
  private stepNumber = 0;
  private stepId = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: StepDialogData,
    private readonly recipeStepHttpService: RecipeStepHttpService,
    private readonly dialogRef: MatDialogRef<
      StepDialogComponent,
      StepDialogClose
    >,
    private readonly recipeStepService: RecipeStepService,
    private readonly snackBarService: SnackBarService
  ) {
    this.assignDialogDataToComponent();
    this.initOnDeleteSequence();
  }

  public onSave(formData: AddStepFormData): void {
    this.loading = true;
    if (this.operationMode === OperationMode.create) {
      this.handleCreateRequest(formData);
    } else {
      this.handleUpdateRequest(formData);
    }
  }

  public onDelete(): void {
    this.closeDialog({ closeReason: CloseReason.delete });
  }

  public onCancel(): void {
    this.closeDialog({ closeReason: CloseReason.abort });
  }

  private closeDialog(closeDialogData: StepDialogClose) {
    this.dialogRef.close(closeDialogData);
  }

  private assignDialogDataToComponent(): void {
    this.operationMode = this.dialogData.operationMode;
    this.initialData.instruction = this.dialogData.recipeStep.stepInstruction;
    this.recipeId = this.dialogData.recipeStep.recipeId;
    this.stepNumber = this.dialogData.recipeStep.stepNumber;
    this.stepId = this.dialogData.recipeStep.recipeStepId;
  }

  private initOnDeleteSequence(): void {
    this.dialogRef
      .afterClosed()
      .pipe(
        filter((v) => v?.closeReason === CloseReason.delete),
        switchMap(() =>
          this.snackBarService.openDeleteSnackBar().afterDismissed()
        ),
        filter((v) => v.dismissedByAction === false),
        switchMap(() =>
          this.recipeStepHttpService.sendDeleteRecipeStepRequest(
            this.dialogData.recipeStep.recipeId.toString(),
            this.dialogData.recipeStep.recipeStepId.toString()
          )
        )
      )
      .subscribe(() => {
        this.recipeStepService.stepDeleted();
      });
  }

  private handleCreateRequest(formData: AddStepFormData): void {
    const recipeId = this.recipeId.toString();
    const createdStep: ICreateRecipeStepDTO = {
      stepInstruction: formData.instruction,
      stepNumber: this.stepNumber,
    };

    this.recipeStepHttpService
      .sendCreateRecipeStepRequest(recipeId, createdStep)
      .pipe(
        tap(() => {
          this.recipeStepService.stepCreated();
        }),
        delay(1000)
      )
      .subscribe(() => {
        this.closeDialog({ closeReason: CloseReason.create });
      });
  }

  private handleUpdateRequest(formData: AddStepFormData) {
    const recipeId = this.recipeId.toString();
    const stepId = this.stepId.toString();
    const updatedStep: IUpdateRecipeStepDTO = {
      stepInstruction: formData.instruction,
    };

    this.recipeStepHttpService
      .sendUpdateRecipeStepRequest(recipeId, stepId, updatedStep)
      .pipe(
        tap(() => {
          this.recipeStepService.stepUpdated();
        }),
        delay(1000)
      )
      .subscribe(() => {
        this.closeDialog({ closeReason: CloseReason.update });
      });
  }
}
