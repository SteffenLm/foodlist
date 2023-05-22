import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FabButtonComponent } from '@foodlist/foodlist-app/ui';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { RecipeOverviewModule } from './features/recipe-overview/recipe-overview.module';
import { RecipeStepsModule } from './features/recipe-steps/recipe-steps.module';
import { RecipeSubstancesModule } from './features/recipe-substances/recipe-substances.module';
import { EditRecipeService } from './services/edit-recipe.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    FabButtonComponent,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    RecipeOverviewModule,
    RecipeStepsModule,
    RecipeSubstancesModule,
    EditRecipeComponent,
  ],
  providers: [EditRecipeService],
  exports: [EditRecipeComponent],
})
export class EditRecipeModule {}
