import { AsyncPipe, NgFor } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { FabButtonComponent } from '@foodlist/foodlist-app/ui';
import { Observable } from 'rxjs';
import { IRecipeDTO } from '../../models/recipe.dto';
import { RecipeDialogService } from '../../services/recipe-dialog.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'foodlist-recipes',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatListModule, NgFor, RouterLink, FabButtonComponent, AsyncPipe],
})
export class RecipeListComponent {
  public $ownRecipes: Observable<IRecipeDTO[]>;

  constructor(
    private recipeService: RecipeService,
    private recipeDialogService: RecipeDialogService
  ) {
    // this.$ownRecipes = this.recipeService.getRecipes();
    this.$ownRecipes = this.recipeService.getRecipesData();
  }

  public onCreateRecipe() {
    this.recipeDialogService.openCreateRecipeDialog();
  }
}
