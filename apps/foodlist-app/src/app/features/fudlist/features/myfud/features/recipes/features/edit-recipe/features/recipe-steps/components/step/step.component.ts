import { TextFieldModule } from '@angular/cdk/text-field';
import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingSpinnerButtonComponent } from '@foodlist/foodlist-app/ui';
import { AddStepFormData, OperationMode } from './step.interfaces';

@Component({
  selector: 'foodlist-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    LoadingSpinnerButtonComponent,
  ],
})
export class StepComponent implements OnInit {
  @Input() public showLoadingSpinner = false;
  @Input() public mode: OperationMode = OperationMode.create;
  @Input() public initialValues: AddStepFormData = {
    instruction: '',
  };

  @Output() public cancel: EventEmitter<void> = new EventEmitter();
  @Output() public save: EventEmitter<AddStepFormData> = new EventEmitter();
  @Output() public delete: EventEmitter<void> = new EventEmitter();

  public addStepForm: UntypedFormGroup;
  public operationMode = OperationMode;

  constructor(private readonly formBuilder: UntypedFormBuilder) {
    this.addStepForm = this.createForm();
  }

  public ngOnInit(): void {
    this.addStepForm.setValue(this.initialValues);
  }

  public onAbort(): void {
    this.cancel.emit();
  }

  public onClose(): void {
    this.cancel.emit();
  }

  public onDelete(): void {
    this.delete.emit(this.addStepForm.value);
  }

  public onSubmit(): void {
    this.save.emit(this.addStepForm.value);
  }

  private createForm(): UntypedFormGroup {
    return this.formBuilder.group({
      instruction: ['', [Validators.required]],
    });
  }
}
