import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddToFudlistComponent } from './components/add-to-fudlist/add-to-fudlist.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FabButtonComponent } from '@foodlist/foodlist-app/ui';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { EditRecipeModule } from './features/edit-recipe/edit-recipe.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeDialogService } from './services/recipe-dialog.service';
import { RecipeHttpService } from './services/recipe-http.service';
import { RecipeService } from './services/recipe.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditRecipeModule,
    FabButtonComponent,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatSnackBarModule,
    RecipesRoutingModule,
    RecipeListComponent,
    CreateRecipeComponent,
    RecipeDetailsComponent,
    AddToFudlistComponent,
  ],
  providers: [RecipeService, RecipeHttpService, RecipeDialogService],
})
export class RecipesModule {}
