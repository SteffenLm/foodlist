import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'foodlist-my-fud-home',
  templateUrl: './my-fud-home.component.html',
  styleUrls: ['./my-fud-home.component.scss'],
  standalone: true,
  imports: [MatTabsModule, NgFor, RouterLink, NgClass, RouterOutlet],
})
export class MyFudHomeComponent {
  public linksItems = [
    {
      link: './recipes',
      text: 'Rezepte',
    },
    {
      link: './substances/ingredients',
      text: 'Zutaten',
    },
    {
      link: './substances/spices',
      text: 'Gewürze',
    },
  ];
  public activeLink = './recipes';
}
