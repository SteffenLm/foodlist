import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { unitTextsLong } from '../../../../../../models/unit.model';
import { Action, SubstanceType } from '../../models/substance.enum';
import { ISubstance } from '../../models/substance.interface';
import { SubstanceService } from '../../services/substance.service';
import {
  IStaticTemplateValues,
  ISubstanceDetailsData,
} from './substance-details.interface';

@Component({
  selector: 'foodlist-substance-details',
  templateUrl: './substance-details.component.html',
  styleUrls: ['./substance-details.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    MatButtonModule,
  ],
})
export class SubstanceDetailsComponent {
  public unitTexts: string[] = unitTextsLong;
  public staticTemplateValues: IStaticTemplateValues;
  public substanceForm: UntypedFormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<SubstanceDetailsComponent>,
    private readonly substanceService: SubstanceService,
    private readonly formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: ISubstanceDetailsData
  ) {
    this.substanceForm = this.createSubstanceForm();
    this.staticTemplateValues = this.initializeStaticTemplateValues(dialogData);
  }

  public onSubmit(): void {
    const substance = this.getSubstanceInstanceFromForm();
    this.sendHttpRequest(substance);
    this.closeDialog();
  }

  public onAbort(): void {
    this.closeDialog();
  }

  private getSubstanceInstanceFromForm(): ISubstance {
    const substance = this.getSubstanceFormValues();
    if (this.isUpdateDialog()) {
      substance.substanceId = this.dialogData.substance.substanceId;
    }
    return substance;
  }

  private getSubstanceFormValues(): ISubstance {
    return this.substanceForm.value;
  }

  private sendHttpRequest(substance: ISubstance) {
    if (this.isCreateDialog()) {
      this.substanceService.addSubstance(substance);
    } else {
      this.substanceService.editSubstance(substance);
    }
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }

  private createSubstanceForm(): UntypedFormGroup {
    return this.formBuilder.group({
      substanceName: [
        this.dialogData.substance.substanceName,
        [Validators.required, Validators.minLength(2)],
      ],
      defaultUnit: [
        this.dialogData.substance.defaultUnit,
        [Validators.required],
      ],
      type: [this.dialogData.substance.type, [Validators.required]],
    });
  }

  private initializeStaticTemplateValues(
    substanceDetailsData: ISubstanceDetailsData
  ): IStaticTemplateValues {
    return {
      actionName: this.calculateActionName(substanceDetailsData.action),
      substanceTypeName: this.calculateSubstanceTypeName(
        substanceDetailsData.substance.type
      ),
    };
  }

  private calculateActionName(action: Action): string {
    return action === Action.create ? 'erstellen' : 'ändern';
  }

  private calculateSubstanceTypeName(substanceType: SubstanceType): string {
    return substanceType === SubstanceType.ingredient ? 'Zutat' : 'Gewürz';
  }

  private isCreateDialog(): boolean {
    return this.dialogData.action === Action.create;
  }

  private isUpdateDialog(): boolean {
    return this.dialogData.action === Action.update;
  }
}
