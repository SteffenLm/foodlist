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

describe('Substance Http Service', () => {
  let substanceHttpService: SubstanceHttpService;

  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubstanceHttpService],
    });
    substanceHttpService = TestBed.inject(SubstanceHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(substanceHttpService).toBeTruthy();
    expect(httpClient).toBeTruthy();
    expect(httpTestingController).toBeTruthy();
  });

  it('should GET ISubstanceDTO and convert to ISubstance', () => {
    const mockedBackendData: ISubstanceDTO[] = [
      {
        substanceId: '1',
        substanceCreator: {
          userId: '1',
        },
        substanceDefaultUnit: {
          unitId: '0',
          unitName: 'NONE',
        },
        substanceName: 'Pepper',
        substanceType: {
          substanceTypeId: '1',
          substanceTypeName: 'SPICE',
        },
      },
    ];

    const expectedBackendData: ISubstance[] = [
      {
        substanceId: '1',
        defaultUnit: Unit.none,
        type: SubstanceType.spice,
        substanceName: 'Pepper',
      },
    ];

    substanceHttpService
      .loadAllSubstancesFromBackend()
      .subscribe((substances) => {
        expect(substances).toEqual(expectedBackendData);
      });
    const req = httpTestingController.expectOne(
      `${environment.foodlistApiUrl}/substances`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockedBackendData);
  });

  it('should POST ICreateSubstanceDTO', () => {
    const givenSubstance: ICreateSubstanceDTO = {
      substanceDefaultUnitId: '0',
      substanceTypeId: '1',
      substanceName: 'Pepper',
    };

    substanceHttpService.sendCreateSubstanceRequest(givenSubstance).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.foodlistApiUrl}/substances`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(null);
  });

  it('should PUT IUpdateSubstanceDTO', () => {
    const givenSubstance: IUpdateSubstanceDTO = {
      substanceId: '1',
      substanceDefaultUnitId: '0',
      substanceTypeId: '1',
      substanceName: 'Pepper',
    };

    substanceHttpService.sendUpdateSubstanceRequest(givenSubstance).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.foodlistApiUrl}/substances/1`
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(null);
  });
});
