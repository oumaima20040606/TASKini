import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="material-icons">check_circle</span>
        <span>TASKini</span>
      </div>
      <nav class="sidebar-nav">
        <a routerLink="/dashboard/tasks" routerLinkActive="active" class="sidebar-link">
          <span class="material-icons">home</span>
          <span>Home</span>
        </a>
        <a routerLink="/dashboard/post-task" routerLinkActive="active" class="sidebar-link">
          <span class="material-icons">add_circle</span>
          <span>Post a Task</span>
        </a>
        <a routerLink="/dashboard/my-tasks" routerLinkActive="active" class="sidebar-link">
          <span class="material-icons">assignment</span>
          <span>My Tasks</span>
        </a>
        <a routerLink="/dashboard/applications" routerLinkActive="active" class="sidebar-link">
          <span class="material-icons">work</span>
          <span>Tasks I Applied To</span>
        </a>
        <a routerLink="/dashboard/profile" routerLinkActive="active" class="sidebar-link">
          <span class="material-icons">person</span>
          <span>Profile</span>
        </a>
        <a (click)="logout()" class="sidebar-link logout">
          <span class="material-icons">logout</span>
          <span>Logout</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100vh;
      background: var(--white);
      border-right: 1px solid var(--border-light);
      position: fixed;
      top: 0;
      left: 0;
      overflow-y: auto;
      z-index: 50;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--primary-green);
      border-bottom: 1px solid var(--border-light);
    }

    .sidebar-brand .material-icons {
      font-size: 2rem;
    }

    .sidebar-nav {
      padding: 1.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      color: var(--text-gray);
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
      text-decoration: none;
    }

    .sidebar-link:hover {
      background: var(--bg-greenish);
      color: var(--primary-green);
    }

    .sidebar-link.active {
      background: var(--bg-greenish);
      color: var(--primary-green);
      border-right: 3px solid var(--primary-green);
    }

    .sidebar-link .material-icons {
      font-size: 1.5rem;
    }

    .sidebar-link.logout {
      margin-top: auto;
      color: var(--text-light);
    }

    .sidebar-link.logout:hover {
      background: #FFEBEE;
      color: #D32F2F;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 70px;
      }

      .sidebar-brand span:not(.material-icons),
      .sidebar-link span:not(.material-icons) {
        display: none;
      }

      .sidebar-link {
        justify-content: center;
        padding: 1rem;
      }
    }
  `]
})
export class SidebarComponent {
  constructor(private userService: UserService) {}

  logout(): void {
    this.userService.logout();
    window.location.href = '/';
  }
}
