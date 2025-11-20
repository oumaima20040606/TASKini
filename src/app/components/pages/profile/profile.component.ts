import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/task.model';
import { BadgeComponent } from '../../shared/badge/badge.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <div class="profile" *ngIf="user">
      <h1>My Profile</h1>
      
      <div class="profile-card">
        <div class="profile-header">
          <img [src]="user.avatar" [alt]="user.name" class="profile-avatar">
          <div class="profile-info">
            <h2>{{ user.name }}</h2>
            <p>{{ user.email }}</p>
            <div class="profile-stats">
              <div class="stat">
                <span class="material-icons">task_alt</span>
                <div>
                  <strong>{{ user.completedTasks }}</strong>
                  <span>Completed</span>
                </div>
              </div>
              <div class="stat">
                <span class="material-icons">star</span>
                <div>
                  <strong>{{ user.rating }}</strong>
                  <span>Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-section" *ngIf="user.bio">
          <h3>About</h3>
          <p>{{ user.bio }}</p>
        </div>

        <div class="profile-section" *ngIf="user.skills.length > 0">
          <h3>Skills</h3>
          <div class="skills-list">
            <app-badge *ngFor="let skill of user.skills" [text]="skill"></app-badge>
          </div>
        </div>

        <div class="profile-actions">
          <button class="btn btn-primary">
            <span class="material-icons">edit</span>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile {
      max-width: 900px;
      margin: 0 auto;
    }

    .profile h1 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    .profile-card {
      background: var(--white);
      border-radius: 1rem;
      padding: 2.5rem;
      box-shadow: 0 4px 16px var(--shadow-light);
    }

    .profile-header {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-light);
    }

    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid var(--primary-green);
    }

    .profile-info h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .profile-info p {
      color: var(--text-gray);
      margin-bottom: 1rem;
    }

    .profile-stats {
      display: flex;
      gap: 2rem;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .stat .material-icons {
      color: var(--primary-green);
      font-size: 2rem;
    }

    .stat strong {
      display: block;
      font-size: 1.5rem;
      color: var(--text-dark);
    }

    .stat span:not(.material-icons) {
      color: var(--text-gray);
      font-size: 0.875rem;
    }

    .profile-section {
      margin-bottom: 2rem;
    }

    .profile-section h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .profile-actions {
      display: flex;
      gap: 1rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border-light);
    }

    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }

      .profile-stats {
        justify-content: center;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }
}
