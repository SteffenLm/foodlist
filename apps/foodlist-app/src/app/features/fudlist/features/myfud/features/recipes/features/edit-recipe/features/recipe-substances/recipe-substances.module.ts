import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EditRecipeSubstancesComponent } from './components/edit-recipe-substances/edit-recipe-substances.component';
import { SubstanceDialogComponent } from './components/substance-dialog/substance-dialog.component';
import { SubstanceComponent } from './components/substance/substance.component';

import { LoadingSpinnerButtonComponent } from '@foodlist/foodlist-app/ui';
import { RecipeSubstanceDialogService } from './services/recipe-substance-dialog.service';
import { RecipeSubstanceHttpService } from './services/recipe-substance-http.service';
import { RecipeSubstanceService } from './services/recipe-substance.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerButtonComponent,
    FormsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    SubstanceComponent,
    SubstanceDialogComponent,
    EditRecipeSubstancesComponent,
  ],
  providers: [
    RecipeSubstanceDialogService,
    RecipeSubstanceHttpService,
    RecipeSubstanceService,
  ],
  exports: [
    SubstanceComponent,
    SubstanceDialogComponent,
    EditRecipeSubstancesComponent,
  ],
})
export class RecipeSubstancesModule {}
