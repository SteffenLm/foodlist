import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

const angularMaterialModules = [
  MatListModule,
  MatIconModule,
  MatProgressBarModule,
  MatToolbarModule,
];

@NgModule({
  imports: [angularMaterialModules],
  exports: [angularMaterialModules],
})
export class AngularMaterialModule {}
