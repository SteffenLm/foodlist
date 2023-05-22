import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FudlistHomeComponent } from './components/fudlist-home/fudlist-home.component';
import { FudListRoutingModule } from './fud-list-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SubstanceHttpService } from './features/myfud/features/substances/services/substance-http.service';
import { SubstanceService } from './features/myfud/features/substances/services/substance.service';

@NgModule({
  imports: [
    CommonModule,
    FudListRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FudlistHomeComponent,
    WelcomeComponent,
  ],
  providers: [SubstanceService, SubstanceHttpService],
})
export class FudListModule {}
