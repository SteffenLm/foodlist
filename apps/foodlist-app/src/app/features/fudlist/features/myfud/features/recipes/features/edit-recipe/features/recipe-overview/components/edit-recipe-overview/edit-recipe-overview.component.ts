import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUpdateRecipeOverviewDTO } from '../../models/recipe-overview.dto';
import { IRecipeOverview } from '../../models/recipe-overview.model';
import { RecipeOverviewService } from '../../services/recipe-overview.service';

@Component({
  selector: 'foodlist-edit-recipe-overview',
  templateUrl: './edit-recipe-overview.component.html',
  styleUrls: ['./edit-recipe-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
  ],
})
export class EditRecipeOverviewComponent {
  @Output() public currentRecipe: EventEmitter<IRecipeOverview> =
    new EventEmitter();

  public recipeOverview: IRecipeOverview = {
    recipeId: -1,
    recipeName: '',
    recipeServings: 0,
  };
  public $recipeOverview: Observable<IRecipeOverview>;
  public editRecipeForm: UntypedFormGroup;

  constructor(
    private readonly recipeOverviewService: RecipeOverviewService,
    private readonly formBuilder: UntypedFormBuilder
  ) {
    this.editRecipeForm = this.createFormGroup();
    this.$recipeOverview = this.recipeOverviewService.getRecipeOverView().pipe(
      tap((recipeOverview) => {
        this.onChangedRecipe(recipeOverview);
      })
    );
  }

  public onSubmit(recipeId: number): void {
    const recipeFormData = this.getFormData(recipeId.toString());
    this.recipeOverviewService
      .updateRecipeOverview(recipeFormData)
      .subscribe(() => {
        this.editRecipeForm.reset({
          recipeName: recipeFormData.recipeName,
          recipeServings: recipeFormData.recipeServings,
        });
        this.currentRecipe.emit({
          recipeId,
          recipeName: recipeFormData.recipeName,
          recipeServings: recipeFormData.recipeServings,
        });
      });
  }

  private onChangedRecipe(recipeOverview: IRecipeOverview): void {
    this.editRecipeForm.setValue({
      recipeName: recipeOverview.recipeName,
      recipeServings: recipeOverview.recipeServings,
    });
    this.currentRecipe.emit(recipeOverview);
  }

  private getFormData(recipeId: string): IUpdateRecipeOverviewDTO {
    const recipeFormData: IUpdateRecipeOverviewDTO = {
      recipeId,
      recipeName: this.editRecipeForm.controls['recipeName'].value,
      recipeServings: this.editRecipeForm.controls['recipeServings'].value,
    };
    return recipeFormData;
  }

  private createFormGroup(): UntypedFormGroup {
    const formGroup = this.formBuilder.group({
      recipeName: ['', [Validators.required, Validators.minLength(2)]],
      recipeServings: ['', [Validators.min(1)]],
    });
    return formGroup;
  }
}
