import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="applications">
      <h1>Tasks I Applied To</h1>
      <p>Track your task applications</p>
      <div class="empty-state">
        <span class="material-icons">work</span>
        <p>You haven't applied to any tasks yet</p>
      </div>
    </div>
  `,
  styles: [`
    .applications {
      max-width: 1200px;
      margin: 0 auto;
    }
    .empty-state {
      background: var(--white);
      border-radius: 1rem;
      padding: 4rem 2rem;
      text-align: center;
      margin-top: 2rem;
    }
    .empty-state .material-icons {
      font-size: 5rem;
      color: var(--text-light);
      margin-bottom: 1rem;
    }
  `]
})
export class ApplicationsComponent {}
