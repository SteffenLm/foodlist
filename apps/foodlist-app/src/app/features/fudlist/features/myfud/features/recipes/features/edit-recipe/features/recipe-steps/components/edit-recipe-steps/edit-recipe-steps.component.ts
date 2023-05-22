import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { IRecipeStep } from '../../model/recipe-step.model';
import { RecipeStepDialogService } from '../../services/recipe-step-dialog.service';
import { RecipeStepService } from '../../services/recipe-step.service';

@Component({
  selector: 'foodlist-edit-recipe-steps',
  templateUrl: './edit-recipe-steps.component.html',
  styleUrls: ['./edit-recipe-steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, CdkDropList, NgFor, MatCardModule, CdkDrag, AsyncPipe],
})
export class EditRecipeStepsComponent {
  public $recipeSteps!: Observable<IRecipeStep[]>;

  constructor(
    private readonly stepDialogService: RecipeStepDialogService,
    private readonly recipeStepService: RecipeStepService
  ) {
    this.$recipeSteps = this.recipeStepService.getRecipeSteps();
  }

  public onStepOrderChanged(
    event: CdkDragDrop<IRecipeStep[]>,
    recipeSteps: IRecipeStep[]
  ): void {
    moveItemInArray(recipeSteps, event.previousIndex, event.currentIndex);
    this.recipeStepService.updateStepOrder(recipeSteps.slice());
  }

  onStepClicked(clickedStep: IRecipeStep): void {
    this.stepDialogService.openEditStepDialog(clickedStep);
  }
}
