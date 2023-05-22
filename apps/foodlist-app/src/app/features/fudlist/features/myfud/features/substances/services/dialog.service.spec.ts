import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Unit } from '../../../../../models/unit.model';
import { SubstanceType } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';
import { DialogService } from './dialog.service';
import { SubstanceFactoryService } from './substance-factory.service';

describe('Dialog Service', () => {
  let dialogService: DialogService;
  let matDialogServiceSpy: MatDialog;
  let ingredient: ISubstance;

  beforeEach(() => {
    ingredient = {
      substanceId: '1',
      substanceName: 'Apple',
      defaultUnit: Unit.kilogram,
      type: SubstanceType.ingredient,
    };

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        DialogService,
        SubstanceFactoryService,
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn(),
          },
        },
      ],
    });
    dialogService = TestBed.inject(DialogService);
    matDialogServiceSpy = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(dialogService).toBeTruthy();
  });

  it('should open an create dialog', () => {
    const openSpy = jest.spyOn(matDialogServiceSpy, 'open');
    dialogService.openCreateSubstanceDialog(SubstanceType.ingredient);
    expect(openSpy).toHaveBeenCalled();
  });

  it('should open an update dialog', () => {
    dialogService.openEditSubstanceDialog(ingredient);
    const openSpy = jest.spyOn(matDialogServiceSpy, 'open');
    expect(openSpy).toHaveBeenCalled();
  });
});
