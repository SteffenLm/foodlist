import { Injectable } from '@angular/core';
import { Unit } from '../../../../../models/unit.model';
import { SubstanceType } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';

@Injectable()
export class SubstanceFactoryService {
  public createIngredient(): ISubstance {
    return {
      substanceId: '',
      defaultUnit: Unit.none,
      substanceName: '',
      type: SubstanceType.ingredient,
    };
  }

  public createSpice(): ISubstance {
    return {
      substanceId: '',
      defaultUnit: Unit.none,
      substanceName: '',
      type: SubstanceType.spice,
    };
  }

  public getSubstanceInstance(substanceType: SubstanceType): ISubstance {
    if (substanceType === SubstanceType.ingredient) {
      return this.createIngredient();
    } else {
      return this.createSpice();
    }
  }
}
