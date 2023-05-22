import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type MaterialColor = 'primary' | 'secondary' | 'warning';

@Component({
  selector: 'foodlist-fab-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabButtonComponent {
  @Input() icon = '';
  @Input() color: MaterialColor = 'primary';
}
