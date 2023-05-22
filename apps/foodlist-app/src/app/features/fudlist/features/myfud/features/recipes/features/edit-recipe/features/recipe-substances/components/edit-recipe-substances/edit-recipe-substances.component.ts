import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { unitTextsShort } from '../../../../../../../../../../models/unit.model';
import { IRecipeSubstance } from '../../model/recipe-substance.model';
import { RecipeSubstanceDialogService } from '../../services/recipe-substance-dialog.service';
import { RecipeSubstanceService } from '../../services/recipe-substance.service';

@Component({
  selector: 'foodlist-edit-recipe-substances',
  templateUrl: './edit-recipe-substances.component.html',
  styleUrls: ['./edit-recipe-substances.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, AsyncPipe],
})
export class EditRecipeSubstancesComponent {
  public $recipeSubstances: Observable<IRecipeSubstance[]>;
  public unitTexts: string[] = unitTextsShort;

  constructor(
    private readonly recipeSubstanceService: RecipeSubstanceService,
    private readonly recipeSubstanceDialogService: RecipeSubstanceDialogService
  ) {
    this.$recipeSubstances = this.recipeSubstanceService.getRecipeSubstances();
  }

  public onSubstanceClicked(recipeSubstance: IRecipeSubstance): void {
    this.recipeSubstanceDialogService.openEditSubstanceDialog(
      recipeSubstance.recipeId,
      recipeSubstance
    );
  }
}
