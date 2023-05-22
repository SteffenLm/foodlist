import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'foodlist-loading-spinner-button',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './loading-spinner-button.component.html',
  styleUrls: ['./loading-spinner-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerButtonComponent {
  @Input()
  public disabled = false;

  @Input()
  public showLoadingSpinner = false;
}
