import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EditRecipeService } from '../../../services/edit-recipe.service';
import { IUpdateRecipeStepOrderDTO } from '../model/recipe-step.dto';
import { ChangeReason, IRecipeStep } from '../model/recipe-step.model';
import { RecipeStepHttpService } from './recipe-step-http.service';

@Injectable()
export class RecipeStepService {
  private recipeStepsChanged = new BehaviorSubject<ChangeReason>(
    ChangeReason.read
  );

  constructor(
    private readonly editRecipeService: EditRecipeService,
    private readonly recipeStepHttpService: RecipeStepHttpService
  ) {}

  public getRecipeSteps(): Observable<IRecipeStep[]> {
    return this.recipeStepsChanged.asObservable().pipe(
      map(() => this.editRecipeService.getRecipeId()),
      switchMap((recipeId) =>
        this.recipeStepHttpService.sendReadRecipeStepRequest(recipeId)
      )
    );
  }

  public stepCreated(): void {
    this.recipeStepsChanged.next(ChangeReason.create);
  }

  public stepUpdated(): void {
    this.recipeStepsChanged.next(ChangeReason.update);
  }

  public stepDeleted(): void {
    this.recipeStepsChanged.next(ChangeReason.delete);
  }

  public updateStepOrder(recipeSteps: IRecipeStep[]) {
    const recipeStepsDTO: IUpdateRecipeStepOrderDTO = {
      steps: [],
    };
    recipeSteps.forEach((element, index) => {
      recipeStepsDTO.steps.push({
        recipeStepId: element.recipeStepId.toString(),
        stepNumber: ++index,
      });
    });

    this.recipeStepHttpService
      .sendUpdateRecipeStepOrderRequest(
        this.editRecipeService.getRecipeId(),
        recipeStepsDTO
      )
      .subscribe();
  }
}
