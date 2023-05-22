import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'foodlist-foodlist-home',
  templateUrl: './fudlist-home.component.html',
  styleUrls: ['./fudlist-home.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  ],
})
export class FudlistHomeComponent {}
