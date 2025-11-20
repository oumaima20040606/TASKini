import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="my-tasks">
      <h1>My Posted Tasks</h1>
      <p>Manage tasks you've posted</p>
      <div class="empty-state">
        <span class="material-icons">assignment</span>
        <p>You haven't posted any tasks yet</p>
      </div>
    </div>
  `,
  styles: [`
    .my-tasks {
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
export class MyTasksComponent {}
