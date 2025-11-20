import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge">{{ text }}</span>
  `,
  styles: []
})
export class BadgeComponent {
  @Input() text: string = '';
}
