import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FabButtonComponent } from '@foodlist/foodlist-app/ui';
import { SubstanceDetailsComponent } from './components/substance-details/substance-details.component';
import { SubstanceListComponent } from './components/substance-list/substance-list.component';
import { DialogService } from './services/dialog.service';
import { SubstanceFactoryService } from './services/substance-factory.service';
import { SubstanceHttpService } from './services/substance-http.service';
import { SubstanceService } from './services/substance.service';
import { SubstancesRoutingModule } from './substances-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FabButtonComponent,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule,
    SubstancesRoutingModule,
    SubstanceListComponent,
    SubstanceDetailsComponent,
  ],
  providers: [
    SubstanceHttpService,
    SubstanceService,
    SubstanceFactoryService,
    DialogService,
  ],
})
export class SubstancesModule {}
