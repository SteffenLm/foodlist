import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FabButtonComponent } from '@foodlist/foodlist-app/ui';
import { EditRecipeOverviewComponent } from '../../features/recipe-overview/components/edit-recipe-overview/edit-recipe-overview.component';
import { IRecipeOverview } from '../../features/recipe-overview/models/recipe-overview.model';
import { EditRecipeStepsComponent } from '../../features/recipe-steps/components/edit-recipe-steps/edit-recipe-steps.component';
import { RecipeStepDialogService } from '../../features/recipe-steps/services/recipe-step-dialog.service';
import { EditRecipeSubstancesComponent } from '../../features/recipe-substances/components/edit-recipe-substances/edit-recipe-substances.component';
import { RecipeSubstanceDialogService } from '../../features/recipe-substances/services/recipe-substance-dialog.service';
import { EditRecipeService } from '../../services/edit-recipe.service';

@Component({
  selector: 'foodlist-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
  animations: [
    trigger('fab-button', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ opacity: 0 })),
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatTabsModule,
    EditRecipeOverviewComponent,
    EditRecipeSubstancesComponent,
    EditRecipeStepsComponent,
    NgIf,
    FabButtonComponent,
  ],
})
export class EditRecipeComponent {
  public recipeName = '';
  public tabIndex = 1;

  constructor(
    private readonly editRecipeService: EditRecipeService,
    private readonly route: ActivatedRoute,
    private readonly recipeSubstanceDialogService: RecipeSubstanceDialogService,
    private readonly recipeStepDialogService: RecipeStepDialogService
  ) {
    const recipeId = this.route.snapshot.paramMap.get('recipeid');
    if (recipeId) {
      this.editRecipeService.setRecipeId(recipeId);
    }
  }

  public onCurrentRecipe(currentRecipe: IRecipeOverview) {
    this.recipeName = currentRecipe.recipeName;
  }

  public openAddSubstanceDialog(): void {
    this.recipeSubstanceDialogService.openAddSubstanceDialog(
      this.editRecipeService.getRecipeId()
    );
  }

  public openAddStepDialog(): void {
    this.recipeStepDialogService.openAddStepDialog(
      this.editRecipeService.getRecipeId()
    );
  }
}
