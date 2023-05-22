import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubstanceDetailsComponent } from '../components/substance-details/substance-details.component';
import { ISubstanceDetailsData } from '../components/substance-details/substance-details.interface';
import { Action, SubstanceType } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';
import { SubstanceFactoryService } from './substance-factory.service';

@Injectable()
export class DialogService {
  constructor(
    private readonly substanceFactoryService: SubstanceFactoryService,
    private readonly matDialog: MatDialog
  ) {}

  public openCreateSubstanceDialog(substanceType: SubstanceType): void {
    this.openDialog(
      Action.create,
      this.substanceFactoryService.getSubstanceInstance(substanceType)
    );
  }

  public openEditSubstanceDialog(substance: ISubstance): void {
    this.openDialog(Action.update, substance);
  }

  private openDialog(actionType: Action, affectedSubstance: ISubstance): void {
    this.matDialog.open<SubstanceDetailsComponent, ISubstanceDetailsData>(
      SubstanceDetailsComponent,
      {
        panelClass: ['dialog-overlay'],
        maxWidth: '95vw',
        data: {
          action: actionType,
          substance: affectedSubstance,
        },
      }
    );
  }
}
