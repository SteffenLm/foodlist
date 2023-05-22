import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingSpinnerButtonComponent } from '@foodlist/foodlist-app/ui';
import { Observable } from 'rxjs';
import { unitTextsLong } from '../../../../../../../../../../models/unit.model';
import { ISubstance } from '../../../../../../../substances/models/substance.interface';
import { OperationMode } from '../../../recipe-steps/components/step/step.interfaces';
import { IRecipeSubstance } from '../../model/recipe-substance.model';
import { RecipeSubstanceFactory } from '../../services/recipe-substance-factory';
import { RecipeSubstanceForm } from './recipe-substance-form';
import { RecipeSubstanceFormFactory } from './recipe-substance-form-factory';
import { IRecipeSubstanceFormData } from './substance.interface';

@Component({
  selector: 'foodlist-substance',
  templateUrl: './substance.component.html',
  styleUrls: ['./substance.component.scss'],
  providers: [
    RecipeSubstanceFormFactory,
    {
      provide: RecipeSubstanceForm,
      useFactory: (factory: RecipeSubstanceFormFactory) => factory.create(),
      deps: [RecipeSubstanceFormFactory],
    },
    RecipeSubstanceFactory,
  ],
  standalone: true,
  imports: [
    MatToolbarModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgFor,
    MatOptionModule,
    MatSelectModule,
    LoadingSpinnerButtonComponent,
    AsyncPipe,
  ],
})
export class SubstanceComponent implements OnInit {
  @Input() public mode: OperationMode = OperationMode.create;
  @Input() public showLoadingSpinner = false;
  @Input() public errorMessage = '';

  @Input() public recipeSubstance: IRecipeSubstance;

  @Output() public cancel: EventEmitter<void> = new EventEmitter();
  @Output() public delete: EventEmitter<void> = new EventEmitter();
  @Output() public save: EventEmitter<IRecipeSubstanceFormData> =
    new EventEmitter();

  public unitTexts: string[] = unitTextsLong;
  public operationMode = OperationMode;

  public $filteredSubstances: Observable<ISubstance[]>;

  constructor(
    private readonly recipeSubstanceFactory: RecipeSubstanceFactory,
    public recipeSubstanceForm: RecipeSubstanceForm
  ) {
    this.recipeSubstance = this.recipeSubstanceFactory.create();
    this.$filteredSubstances = this.recipeSubstanceForm.filteredSubstances();
  }

  public ngOnInit(): void {
    if (this.mode === OperationMode.edit) {
      this.recipeSubstanceForm.setValue(this.recipeSubstance);
      this.recipeSubstanceForm.disableSubstanceControl();
    }
  }

  public onSubmit(): void {
    this.save.emit(this.recipeSubstanceForm.asFormGroup().value);
  }

  public onAbort(): void {
    this.cancel.emit();
  }

  public onClose(): void {
    this.cancel.emit();
  }

  public onDelete(): void {
    this.delete.emit();
  }

  public displaySubstanceName(substance: ISubstance): string {
    return substance.substanceName;
  }
}
