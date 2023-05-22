import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../../../../../environments/environment';
import { Unit } from '../../../../../models/unit.model';
import {
  ICreateSubstanceDTO,
  ISubstanceDTO,
  IUpdateSubstanceDTO,
} from '../models/substance.dto';
import { SubstanceType } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';
import { SubstanceHttpService } from './substance-http.service';
import { SubstanceService } from './substance.service';

describe('Substance Service', () => {
  let substanceService: SubstanceService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubstanceService, SubstanceHttpService],
    });
    substanceService = TestBed.inject(SubstanceService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created and load substances initially', () => {
    expect(substanceService).toBeTruthy();
    expect(httpClient).toBeTruthy();
    expect(httpTestingController).toBeTruthy();
    httpTestingController.expectOne(`${environment.foodlistApiUrl}/substances`);
    httpTestingController.verify();
  });

  describe('Test Observables', () => {
    let mockedSubstances: ISubstanceDTO[];

    let expectedIngredient: ISubstance;
    let expectedSpice: ISubstance;

    beforeEach(() => {
      mockedSubstances = [
        {
          substanceId: '1',
          substanceName: 'Pepper',
          substanceCreator: {
            userId: '1',
          },
          substanceDefaultUnit: {
            unitId: '0',
            unitName: 'NONE',
          },
          substanceType: {
            substanceTypeId: '1',
            substanceTypeName: 'SPICE',
          },
        },
        {
          substanceId: '2',
          substanceName: 'Penne',
          substanceCreator: {
            userId: '1',
          },
          substanceDefaultUnit: {
            unitId: '0',
            unitName: 'NONE',
          },
          substanceType: {
            substanceTypeId: '0',
            substanceTypeName: 'INGREDIENT',
          },
        },
      ];

      expectedSpice = {
        substanceId: '1',
        defaultUnit: Unit.none,
        substanceName: 'Pepper',
        type: SubstanceType.spice,
      };
      expectedIngredient = {
        substanceId: '2',
        defaultUnit: Unit.none,
        substanceName: 'Penne',
        type: SubstanceType.ingredient,
      };

      const request = httpTestingController.expectOne(
        `${environment.foodlistApiUrl}/substances`
      );
      httpTestingController.verify();
      request.flush(mockedSubstances);
    });

    it('should return all substances', () => {
      const $substances = substanceService.getSubstances();
      $substances.subscribe((substances) => {
        expect(substances).toEqual([expectedIngredient, expectedSpice]);
      });
    });

    it('should return all spices', () => {
      const $substances = substanceService.getSpices();
      $substances.subscribe((spices) => {
        expect(spices).toEqual([expectedSpice]);
      });
    });

    it('should return all ingredients', () => {
      const $substances = substanceService.getIngredients();
      $substances.subscribe((ingredients) => {
        expect(ingredients).toEqual([expectedIngredient]);
      });
    });
  });

  describe('Test Crud Methods', () => {
    let givenSubstance: ISubstance;

    beforeEach(() => {
      givenSubstance = {
        substanceId: '1',
        substanceName: 'Pepper',
        type: SubstanceType.spice,
        defaultUnit: 0 as unknown as Unit,
      };
      const req = httpTestingController.expectOne(
        `${environment.foodlistApiUrl}/substances`
      );
      expect(req.request.method).toEqual('GET');
      req.flush([]);
      httpTestingController.verify();
    });

    it('should send a create substance request', () => {
      substanceService.addSubstance(givenSubstance);
      const expectedBody: ICreateSubstanceDTO = {
        substanceName: 'Pepper',
        substanceTypeId: SubstanceType.spice,
        substanceDefaultUnitId: Unit.none,
      };
      const req = httpTestingController.expectOne(
        `${environment.foodlistApiUrl}/substances`
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedBody);
      httpTestingController.verify();
      req.flush([]);
    });

    it('should send a update substance request', () => {
      substanceService.editSubstance(givenSubstance);
      const expectedBody: IUpdateSubstanceDTO = {
        substanceId: '1',
        substanceName: 'Pepper',
        substanceTypeId: SubstanceType.spice,
        substanceDefaultUnitId: Unit.none,
      };
      const req = httpTestingController.expectOne(
        `${environment.foodlistApiUrl}/substances/1`
      );
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(expectedBody);
      httpTestingController.verify();
      req.flush([]);
    });
  });
});
