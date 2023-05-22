import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { delay, filter, switchMap, tap } from 'rxjs/operators';
import { SnackBarService } from '../../../../../../../../../../../core/services/snack-bar.service';
import { OperationMode } from '../../../recipe-steps/components/step/step.interfaces';
import {
  ICreateRecipeSubstanceDTO,
  IUpdateRecipeSubstanceDTO,
} from '../../model/recipe-substance.dto';
import { IRecipeSubstance } from '../../model/recipe-substance.model';
import { RecipeSubstanceHttpService } from '../../services/recipe-substance-http.service';
import { RecipeSubstanceService } from '../../services/recipe-substance.service';
import { SubstanceComponent } from '../substance/substance.component';
import { IRecipeSubstanceFormData } from '../substance/substance.interface';
import {
  CloseReason,
  IRecipeSubstanceDialogClose,
  IRecipeSubstanceDialogData,
} from './substance-dialog.interface';

@Component({
  selector: 'foodlist-add-substance-dialog',
  templateUrl: './substance-dialog.component.html',
  styleUrls: ['./substance-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SubstanceComponent],
})
export class SubstanceDialogComponent {
  public loading = false;
  public errorMessage = '';
  public operationMode: OperationMode;
  public recipeSubstance: IRecipeSubstance;

  private readonly recipeId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly substanceDialogData: IRecipeSubstanceDialogData,
    public readonly dialogRef: MatDialogRef<
      SubstanceDialogComponent,
      IRecipeSubstanceDialogClose
    >,
    private readonly recipeSubstanceHttpService: RecipeSubstanceHttpService,
    private readonly recipeSubstanceService: RecipeSubstanceService,
    private readonly snackBarService: SnackBarService
  ) {
    this.operationMode = this.substanceDialogData.operationMode;
    this.recipeSubstance = this.substanceDialogData.recipeSubstance;
    this.recipeId = this.substanceDialogData.recipeId;
    this.initOnDeleteSequence();
  }

  public onSave(formData: IRecipeSubstanceFormData): void {
    this.loading = true;
    if (this.operationMode === OperationMode.create) {
      this.handleCreateRequest(formData);
    } else {
      this.handleUpdateRequest(formData);
    }
  }
  handleUpdateRequest(formData: IRecipeSubstanceFormData) {
    const recipeId = this.recipeId.toString();
    const substanceId =
      this.substanceDialogData.recipeSubstance.substanceId.toString();
    const updateRecipeSubstanceDTO: IUpdateRecipeSubstanceDTO = {
      substanceAmount: formData.amount,
      substanceUnit: formData.unit.toString(),
    };

    this.recipeSubstanceHttpService
      .sendUpdateRecipeSubstanceRequest(
        recipeId,
        substanceId,
        updateRecipeSubstanceDTO
      )
      .pipe(
        tap(() => {
          this.recipeSubstanceService.substanceUpdated();
        }),
        delay(1000)
      )
      .subscribe(() => {
        this.closeDialog({ closeReason: CloseReason.update });
      });
  }
  handleCreateRequest(formData: IRecipeSubstanceFormData) {
    const recipeId = this.recipeId.toString();
    const createdRecipeSubstance: ICreateRecipeSubstanceDTO = {
      substanceId: formData.substance.substanceId.toString(),
      substanceAmount: formData.amount,
      substanceUnit: formData.unit.toString(),
    };

    this.recipeSubstanceHttpService
      .sendCreateRecipeSubstanceRequest(recipeId, createdRecipeSubstance)
      .pipe(
        tap(() => {
          this.recipeSubstanceService.substanceCreated();
        }),
        delay(1000)
      )
      .subscribe(
        () => {
          this.closeDialog({ closeReason: CloseReason.create });
        },
        (errorResponse) => {
          this.handleCreateError(errorResponse);
        }
      );
  }

  public onDelete(): void {
    this.closeDialog({ closeReason: CloseReason.delete });
  }

  public onCancel(): void {
    this.closeDialog({ closeReason: CloseReason.abort });
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
          this.recipeSubstanceHttpService.sendDeleteRecipeSubstanceRequest(
            this.substanceDialogData.recipeId.toString(),
            this.substanceDialogData.recipeSubstance.substanceId.toString()
          )
        )
      )
      .subscribe(() => {
        this.recipeSubstanceService.substanceDeleted();
      });
  }

  private closeDialog(closeDialogData: IRecipeSubstanceDialogClose) {
    this.dialogRef.close(closeDialogData);
  }

  private handleCreateError(errorResponse: HttpErrorResponse): void {
    this.loading = false;
    if (errorResponse.error.message === 'Substance already added') {
      this.errorMessage = 'Zutat wurde schon hinzugefügt';
    }
  }
}
