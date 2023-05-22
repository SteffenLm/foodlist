import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Unit } from '../../../../../../models/unit.model';
import { Action, SubstanceType } from '../../models/substance.enum';
import { ISubstance } from '../../models/substance.interface';
import { SubstanceService } from '../../services/substance.service';
import { SubstanceDetailsComponent } from './substance-details.component';
import { ISubstanceDetailsData } from './substance-details.interface';

describe('SubstanceDetailsComponent - Update Ingredient', () => {
  let component: SubstanceDetailsComponent;
  let fixture: ComponentFixture<SubstanceDetailsComponent>;
  let loader: HarnessLoader;

  let substanceService: SubstanceService;
  let dialogRef: MatDialogRef<SubstanceDetailsComponent>;

  beforeEach(() => {
    const fakeSubstanceService = {
      addSubstance: jest.fn(),
      editSubstance: jest.fn(),
    };
    const fakeDialogRef = {
      close: jest.fn(),
    };
    const fakeDialogData: ISubstanceDetailsData = {
      action: Action.update,
      substance: {
        substanceId: '-1',
        substanceName: 'Apple',
        type: SubstanceType.ingredient,
        defaultUnit: Unit.none,
      },
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        SubstanceDetailsComponent,
      ],
      providers: [
        {
          provide: SubstanceService,
          useValue: fakeSubstanceService,
        },
        {
          provide: MatDialogRef,
          useValue: fakeDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: fakeDialogData,
        },
      ],
    });
    fixture = TestBed.createComponent(SubstanceDetailsComponent);
    substanceService = TestBed.inject(SubstanceService);
    dialogRef = TestBed.inject(MatDialogRef);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('should create itself', () => {
    expect(component).toBeDefined();
  });

  it('should display "Zutat ändern"', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const toolbarText: HTMLSpanElement =
      fixture.nativeElement.querySelector('span');
    expect(toolbarText.textContent).toEqual('Zutat ändern');
  });

  it('should prefill the description with "Apple"', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const inputElement = await loader.getHarness(MatInputHarness);
    const inputValue = await inputElement.getValue();
    expect(inputValue).toEqual('Apple');
  });

  it('should translate the unit to "Keine"', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const selectElement = await loader.getHarness(MatSelectHarness);
    const selectedDisplayValue = await selectElement.getValueText();
    expect(selectedDisplayValue).toEqual('');
  });

  it('should close the dialog on abort button click', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const abortButton = await loader.getHarness(
      MatButtonHarness.with({ selector: '[mat-button]' })
    );
    await abortButton.click();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });

  it('should call editSubstance with the right value', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const abortButton = await loader.getHarness(
      MatButtonHarness.with({ selector: '[mat-raised-button]' })
    );
    await abortButton.click();
    const expectedSubstance: ISubstance = {
      substanceId: '-1',
      substanceName: 'Apple',
      type: SubstanceType.ingredient,
      defaultUnit: Unit.none,
    };
    expect(substanceService.editSubstance).toHaveBeenCalled();
    expect(substanceService.editSubstance).toHaveBeenCalledWith(
      expectedSubstance
    );
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });
});

describe('SubstanceDetailsComponent - Create Ingredient', () => {
  let component: SubstanceDetailsComponent;
  let fixture: ComponentFixture<SubstanceDetailsComponent>;
  let loader: HarnessLoader;

  let substanceService: SubstanceService;
  let dialogRef: MatDialogRef<SubstanceDetailsComponent>;

  beforeEach(() => {
    const fakeSubstanceService = {
      addSubstance: jest.fn(),
      editSubstance: jest.fn(),
    };
    const fakeDialogRef = {
      close: jest.fn(),
    };
    const fakeDialogData: ISubstanceDetailsData = {
      action: Action.create,
      substance: {
        substanceId: '-1',
        substanceName: 'Apple',
        type: SubstanceType.ingredient,
        defaultUnit: Unit.none,
      },
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        SubstanceDetailsComponent,
      ],
      providers: [
        {
          provide: SubstanceService,
          useValue: fakeSubstanceService,
        },
        {
          provide: MatDialogRef,
          useValue: fakeDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: fakeDialogData,
        },
      ],
    });
    fixture = TestBed.createComponent(SubstanceDetailsComponent);
    substanceService = TestBed.inject(SubstanceService);
    dialogRef = TestBed.inject(MatDialogRef);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('should create itself', () => {
    expect(component).toBeDefined();
  });

  it('should display "Zutat erstellen"', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const toolbarText: HTMLSpanElement =
      fixture.nativeElement.querySelector('span');
    expect(toolbarText.textContent).toEqual('Zutat erstellen');
  });

  it('should call addSubstance with the right value', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const abortButton = await loader.getHarness(
      MatButtonHarness.with({ selector: '[mat-raised-button]' })
    );
    await abortButton.click();
    const expectedSubstance = {
      substanceName: 'Apple',
      type: SubstanceType.ingredient,
      defaultUnit: Unit.none,
    };
    expect(substanceService.addSubstance).toHaveBeenCalled();
    expect(substanceService.addSubstance).toHaveBeenCalledWith(
      expectedSubstance as ISubstance
    );
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });
});

describe('SubstanceDetailsComponent - Create Spice', () => {
  let component: SubstanceDetailsComponent;
  let fixture: ComponentFixture<SubstanceDetailsComponent>;

  beforeEach(() => {
    const fakeSubstanceService = {
      addSubstance: jest.fn(),
      editSubstance: jest.fn(),
    };
    const fakeDialogRef = {
      close: jest.fn(),
    };
    const fakeDialogData: ISubstanceDetailsData = {
      action: Action.create,
      substance: {
        substanceId: '-1',
        substanceName: 'Pepper',
        type: SubstanceType.spice,
        defaultUnit: Unit.none,
      },
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        SubstanceDetailsComponent,
      ],
      providers: [
        {
          provide: SubstanceService,
          useValue: fakeSubstanceService,
        },
        {
          provide: MatDialogRef,
          useValue: fakeDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: fakeDialogData,
        },
      ],
    });
    fixture = TestBed.createComponent(SubstanceDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create itself', () => {
    expect(component).toBeDefined();
  });

  it('should display "Gewürz erstellen"', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const toolbarText: HTMLSpanElement =
      fixture.nativeElement.querySelector('span');
    expect(toolbarText.textContent).toEqual('Gewürz erstellen');
  });
});

describe('SubstanceDetailsComponent - Update Spice', () => {
  let component: SubstanceDetailsComponent;
  let fixture: ComponentFixture<SubstanceDetailsComponent>;

  beforeEach(() => {
    const fakeSubstanceService = {
      addSubstance: jest.fn(),
      editSubstance: jest.fn(),
    };
    const fakeDialogRef = {
      close: jest.fn(),
    };
    const fakeDialogData: ISubstanceDetailsData = {
      action: Action.update,
      substance: {
        substanceId: '-1',
        substanceName: 'Pepper',
        type: SubstanceType.spice,
        defaultUnit: Unit.none,
      },
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        SubstanceDetailsComponent,
      ],
      providers: [
        {
          provide: SubstanceService,
          useValue: fakeSubstanceService,
        },
        {
          provide: MatDialogRef,
          useValue: fakeDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: fakeDialogData,
        },
      ],
    });
    fixture = TestBed.createComponent(SubstanceDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create itself', () => {
    expect(component).toBeDefined();
  });

  it('should display "Gewürz ändern"', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const toolbarText: HTMLSpanElement =
      fixture.nativeElement.querySelector('span');
    expect(toolbarText.textContent).toEqual('Gewürz ändern');
  });
});
