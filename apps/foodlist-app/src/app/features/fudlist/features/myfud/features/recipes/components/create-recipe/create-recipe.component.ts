import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ICreateRecipeDTO } from '../../models/recipe.dto';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'foodlist-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class CreateRecipeComponent {
  public recipeForm: UntypedFormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<CreateRecipeComponent>,
    private readonly recipeService: RecipeService,
    private readonly formBuilder: UntypedFormBuilder
  ) {
    this.recipeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      portions: ['', [Validators.min(1)]],
    });
  }

  public onSubmit(): void {
    const recipeDto: ICreateRecipeDTO = {
      recipeName: this.recipeForm.controls['name'].value,
      recipeServings: this.recipeForm.controls['portions'].value,
    };
    this.recipeService.sendCreateRecipeRequest(recipeDto).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
