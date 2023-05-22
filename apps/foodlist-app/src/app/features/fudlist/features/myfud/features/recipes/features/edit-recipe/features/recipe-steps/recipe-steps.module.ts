import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingSpinnerButtonComponent } from '@foodlist/foodlist-app/ui';
import { SnackBarService } from '../../../../../../../../../core/services/snack-bar.service';
import { EditRecipeStepsComponent } from './components/edit-recipe-steps/edit-recipe-steps.component';
import { StepDialogComponent } from './components/step-dialog/step-dialog.component';
import { StepComponent } from './components/step/step.component';
import { RecipeStepDialogService } from './services/recipe-step-dialog.service';
import { RecipeStepHttpService } from './services/recipe-step-http.service';
import { RecipeStepService } from './services/recipe-step.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerButtonComponent,
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSnackBarModule,
    StepComponent,
    EditRecipeStepsComponent,
    StepDialogComponent,
  ],
  providers: [
    RecipeStepDialogService,
    RecipeStepHttpService,
    RecipeStepService,
    SnackBarService,
  ],
  exports: [StepComponent, EditRecipeStepsComponent],
})
export class RecipeStepsModule {}
