import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FabButtonComponent } from '@foodlist/foodlist-app/ui';
import { Observable } from 'rxjs';
import { unitTextsShort } from '../../../../../../models/unit.model';
import { IRecipeDetailDTO } from '../../models/dto/recipe.dto';
import { ISubstanceEntry } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'foodlist-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatListModule,
    NgFor,
    FabButtonComponent,
    AsyncPipe,
    DecimalPipe,
  ],
})
export class RecipeDetailsComponent {
  public $recipe!: Observable<IRecipeDetailDTO>;
  public spices: ISubstanceEntry[] = [];
  public ingredients: ISubstanceEntry[] = [];
  public unitTexts: string[] = unitTextsShort;

  constructor(
    private readonly recipeService: RecipeService,
    private readonly route: ActivatedRoute
  ) {
    const recipeId = this.route.snapshot.paramMap.get('recipeid');
    if (recipeId) {
      this.recipeService.setChangedRecipe(recipeId);
      this.$recipe = this.recipeService.getRecipe();
    }

    // this.spices = this.recipe.containedSubstances.filter((substance) => substance.substance.type === SubstanceType.spice);
    // this.ingredients = this.recipe.containedSubstances.filter((substance) => substance.substance.type === SubstanceType.ingredient);
  }

  public onAddToFudlist(): void {
    // this.dialog.open<AddToFudlistComponent, AddToFudlistComponentData>(AddToFudlistComponent, {
    //   data: {
    //     recipe: this.recipe
    //   }
    // });
  }
}
