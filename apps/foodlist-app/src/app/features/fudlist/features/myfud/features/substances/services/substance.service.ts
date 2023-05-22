import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChangeReason } from '../models/substance.enum';
import { ISubstance } from '../models/substance.interface';
import {
  mapSubstanceInterfaceToCreateSubstanceDto,
  mapSubstanceInterfaceToUpdateSubstanceDto,
} from '../rxjs/dto.operators';
import {
  filterOnlyIngredients,
  filterOnlySpices,
} from '../rxjs/filter.operators';
import { sortSubstancesAscendingByName } from '../rxjs/sort.operators';
import { SubstanceHttpService } from './substance-http.service';

@Injectable()
export class SubstanceService {
  private substancesChanged = new BehaviorSubject<ChangeReason>(
    ChangeReason.read
  );

  private substancesSubject = new BehaviorSubject<ISubstance[]>([]);
  private createSubstanceSubject = new Subject<ISubstance>();
  private updateSubstanceSubject = new Subject<ISubstance>();

  constructor(private readonly substanceHttpService: SubstanceHttpService) {
    this.subscribeToCreateSubstance();
    this.subscribeToUpdateSubstance();
    this.subscribeToChangedSubstance();
  }

  public getSubstances(): Observable<ISubstance[]> {
    return this.substancesSubject.asObservable();
  }

  public getIngredients(): Observable<ISubstance[]> {
    return this.getSubstances().pipe(filterOnlyIngredients);
  }

  public getSpices(): Observable<ISubstance[]> {
    return this.getSubstances().pipe(filterOnlySpices);
  }

  public addSubstance(substance: ISubstance): void {
    this.createSubstanceSubject.next(substance);
  }

  public editSubstance(updatedSubstance: ISubstance): void {
    this.updateSubstanceSubject.next(updatedSubstance);
  }

  private nextSubstances(substances: ISubstance[]): void {
    this.substancesSubject.next(substances);
  }

  private subscribeToCreateSubstance(): void {
    this.createSubstanceSubject
      .pipe(
        mapSubstanceInterfaceToCreateSubstanceDto,
        switchMap((substance) =>
          this.substanceHttpService.sendCreateSubstanceRequest(substance)
        )
      )
      .subscribe(() => {
        this.substancesChanged.next(ChangeReason.create);
      });
  }
  private subscribeToUpdateSubstance(): void {
    this.updateSubstanceSubject
      .pipe(
        mapSubstanceInterfaceToUpdateSubstanceDto,
        switchMap((substance) =>
          this.substanceHttpService.sendUpdateSubstanceRequest(substance)
        )
      )
      .subscribe(() => {
        this.substancesChanged.next(ChangeReason.update);
      });
  }
  private subscribeToChangedSubstance(): void {
    this.substancesChanged
      .pipe(
        switchMap(() =>
          this.substanceHttpService.loadAllSubstancesFromBackend()
        ),
        sortSubstancesAscendingByName
      )
      .subscribe((substances) => {
        this.nextSubstances(substances);
      });
  }
}
