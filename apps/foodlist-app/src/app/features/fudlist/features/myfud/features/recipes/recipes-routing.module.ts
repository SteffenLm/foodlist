import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { EditRecipeComponent } from './features/edit-recipe/components/edit-recipe/edit-recipe.component';

const recipesRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipeListComponent,
  },
  {
    path: ':recipeid/edit',
    component: EditRecipeComponent,
  },
  {
    path: ':recipeid',
    component: RecipeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
