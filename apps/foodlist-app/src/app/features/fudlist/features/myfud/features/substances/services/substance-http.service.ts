import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../environments/environment';
import {
  ICreateSubstanceDTO,
  ISubstanceDTO,
  IUpdateSubstanceDTO,
} from '../models/substance.dto';
import { ISubstance } from '../models/substance.interface';
import { mapSubstanceDtoToSubstanceInterface } from '../rxjs/dto.operators';

@Injectable()
export class SubstanceHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  public sendCreateSubstanceRequest(
    substance: ICreateSubstanceDTO
  ): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.foodlistApiUrl}/substances`,
      substance
    );
  }

  public sendUpdateSubstanceRequest(
    substance: IUpdateSubstanceDTO
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.foodlistApiUrl}/substances/${substance.substanceId}`,
      substance
    );
  }

  public loadAllSubstancesFromBackend(): Observable<ISubstance[]> {
    return this.httpClient
      .get<ISubstanceDTO[]>(`${environment.foodlistApiUrl}/substances`)
      .pipe(mapSubstanceDtoToSubstanceInterface);
  }
}
