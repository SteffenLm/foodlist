import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MyFudHomeComponent } from './components/my-fud-home/my-fud-home.component';
import { MyFudRoutingModule } from './my-fud-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MyFudRoutingModule,
    MyFudHomeComponent,
  ],
})
export class MyFudModule {}
