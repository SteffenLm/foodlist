import { Injectable } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SubstanceHttpService } from '../../../../../../../substances/services/substance-http.service';
import { RecipeSubstanceForm } from './recipe-substance-form';

@Injectable()
export class RecipeSubstanceFormFactory {
  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly substanceHttpService: SubstanceHttpService
  ) {}

  create(): RecipeSubstanceForm {
    const formGroup = this.createFormGroup();
    return new RecipeSubstanceForm(
      formGroup,
      this.substanceHttpService.loadAllSubstancesFromBackend()
    );
  }

  private createFormGroup() {
    return this.formBuilder.group({
      substance: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      unit: ['', [Validators.required]],
    });
  }
}
