import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { ISubstance } from '../../../../../../../substances/models/substance.interface';
import { IRecipeSubstance } from '../../model/recipe-substance.model';

export class RecipeSubstanceForm {
  constructor(
    private readonly formGroup: UntypedFormGroup,
    private readonly availableSubstances: Observable<ISubstance[]>
  ) {
    this.setRecommendedUnit();
  }

  public asFormGroup(): UntypedFormGroup {
    return this.formGroup;
  }

  public isValid(): Observable<boolean> {
    return this.formGroup.statusChanges.pipe(
      map(() => this.formGroup.valid),
      startWith(false)
    );
  }

  public setValue(recipeSubstance: IRecipeSubstance) {
    this.formGroup.setValue({
      substance: recipeSubstance.substanceName,
      amount: recipeSubstance.substanceAmount,
      unit: recipeSubstance.unit,
    });
  }

  public filteredSubstances(): Observable<ISubstance[]> {
    return combineLatest([
      this.getSubstanceInput(),
      this.availableSubstances,
    ]).pipe(
      map(([substanceName, availableSubstances]) => {
        const filterValue = substanceName.toLowerCase();
        const filteredSubstances = availableSubstances.filter(
          (substance) =>
            substance.substanceName.toLowerCase().indexOf(filterValue) === 0
        );
        return filteredSubstances;
      })
    );
  }

  public disableSubstanceControl(): void {
    this.getSubstanceFormControl().disable();
  }

  private getSubstanceInput(): Observable<string> {
    return this.getSubstanceFormControl().valueChanges.pipe(
      startWith(''),
      filter((value) => typeof value === 'string')
    );
  }

  private getSubstanceFormControl(): AbstractControl {
    return this.formGroup.controls['substance'];
  }

  private getUnitFormControl(): AbstractControl {
    return this.formGroup.controls['unit'];
  }

  private setRecommendedUnit(): void {
    this.getSubstanceFormControl()
      .valueChanges.pipe(
        filter((value) => typeof value !== 'string'),
        map((selectedSubstance: ISubstance) => selectedSubstance.defaultUnit)
      )
      .subscribe((defaultUnit) => {
        this.getUnitFormControl().setValue(defaultUnit);
      });
  }
}
