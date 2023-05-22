import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditRecipeOverviewComponent } from './components/edit-recipe-overview/edit-recipe-overview.component';
import { RecipeOverviewHttpService } from './services/recipe-overview-http.service';
import { RecipeOverviewService } from './services/recipe-overview.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    EditRecipeOverviewComponent,
  ],
  providers: [RecipeOverviewService, RecipeOverviewHttpService],
  exports: [EditRecipeOverviewComponent],
})
export class RecipeOverviewModule {}
