import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubstanceListComponent } from './components/substance-list/substance-list.component';
import { SubstanceType } from './models/substance.enum';

const substanceRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ingredients',
  },
  {
    path: 'ingredients',
    component: SubstanceListComponent,
    data: { type: SubstanceType.ingredient },
  },
  {
    path: 'spices',
    component: SubstanceListComponent,
    data: { type: SubstanceType.spice },
  },
  {
    path: '**',
    redirectTo: 'ingredients',
  },
];

@NgModule({
  imports: [RouterModule.forChild(substanceRoutes)],
  exports: [RouterModule],
})
export class SubstancesRoutingModule {}
