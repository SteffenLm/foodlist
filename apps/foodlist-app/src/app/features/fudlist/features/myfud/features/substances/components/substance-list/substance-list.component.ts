import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { FabButtonComponent } from '@foodlist/foodlist-app/ui';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubstanceType } from '../../models/substance.enum';
import { ISubstance } from '../../models/substance.interface';
import {
  mapSubstanceTypeToSubstances,
  mapSubstanceTypeToSubstanceTypeName,
} from '../../rxjs/substance-type.operators';
import { DialogService } from '../../services/dialog.service';
import { SubstanceService } from '../../services/substance.service';
import { ListComponentRouteData } from './substance-list.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'foodlist-substance-list',
  templateUrl: './substance-list.component.html',
  styleUrls: ['./substance-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatListModule, NgFor, NgIf, FabButtonComponent, AsyncPipe],
})
export class SubstanceListComponent {
  public $substanceType: Observable<SubstanceType>;
  public $substanceTypeName: Observable<string>;
  public $selectedSubstances: Observable<ISubstance[]>;

  constructor(
    private readonly dialogService: DialogService,
    private readonly substanceService: SubstanceService,
    private readonly route: ActivatedRoute
  ) {
    this.$substanceType = this.initializeSubstanceTypeObservable();
    this.$substanceTypeName = this.initializeSubstanceTypeNameObservable();
    this.$selectedSubstances = this.initializeSelectedSubstancesObservable();
  }

  public onListItemClicked(clickedSubstance: ISubstance): void {
    this.dialogService.openEditSubstanceDialog(clickedSubstance);
  }

  public onCreateSubstance(substanceType: SubstanceType) {
    this.dialogService.openCreateSubstanceDialog(substanceType);
  }

  public getSubstanceId(index: number, substance: ISubstance) {
    return substance.substanceId;
  }

  private initializeSubstanceTypeObservable(): Observable<SubstanceType> {
    const $routeData = this.route.data as Observable<ListComponentRouteData>;
    return $routeData.pipe<SubstanceType>(map((routeData) => routeData.type));
  }

  private initializeSubstanceTypeNameObservable(): Observable<string> {
    return this.initializeSubstanceTypeObservable().pipe(
      mapSubstanceTypeToSubstanceTypeName
    );
  }

  private initializeSelectedSubstancesObservable(): Observable<ISubstance[]> {
    return this.initializeSubstanceTypeObservable().pipe(
      mapSubstanceTypeToSubstances(this.substanceService)
    );
  }
}
