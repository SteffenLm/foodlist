import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ActivatedRouteStub } from '../../../../../../../../../testing/activated-route-stub';
import { Unit } from '../../../../../../models/unit.model';
import { SubstanceType } from '../../models/substance.enum';
import { ISubstance } from '../../models/substance.interface';
import { DialogService } from '../../services/dialog.service';
import { SubstanceService } from '../../services/substance.service';
import { SubstanceListComponent } from './substance-list.component';

describe('SubstanceListComponent', () => {
  let component: SubstanceListComponent;
  let fixture: ComponentFixture<SubstanceListComponent>;

  beforeEach(() => {
    const fakeSubstanceService = {
      getIngredients: jest.fn(),
      getSpices: jest.fn(),
    };
    const ingredients: ISubstance[] = [
      {
        substanceId: '1',
        substanceName: 'Apple',
        defaultUnit: Unit.piece,
        type: SubstanceType.ingredient,
      },
    ];
    const spices: ISubstance[] = [
      {
        substanceId: '1',
        substanceName: 'Pepper',
        defaultUnit: Unit.none,
        type: SubstanceType.spice,
      },
    ];
    jest
      .spyOn(fakeSubstanceService, 'getIngredients')
      .mockReturnValue(of(ingredients));
    jest.spyOn(fakeSubstanceService, 'getSpices').mockReturnValue(of(spices));

    const fakeDialogService = {
      openCreateSubstanceDialog: jest.fn(),
      openEditSubstanceDialog: jest.fn(),
    };
    jest
      .spyOn(fakeDialogService, 'openCreateSubstanceDialog')
      .mockReturnValue(null);
    jest
      .spyOn(fakeDialogService, 'openEditSubstanceDialog')
      .mockReturnValue(null);

    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        SubstanceListComponent,
      ],
      providers: [
        {
          provide: SubstanceService,
          useValue: fakeSubstanceService,
        },
        {
          provide: DialogService,
          useValue: fakeDialogService,
        },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub,
        },
      ],
    });

    fixture = TestBed.createComponent(SubstanceListComponent);
    component = fixture.componentInstance;
  });

  it('should create itself', () => {
    expect(component).toBeDefined();
  });
});
