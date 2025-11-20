import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/pages/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
      },
      {
        path: 'tasks',
        loadComponent: () => import('./components/pages/task-feed/task-feed.component').then(m => m.TaskFeedComponent)
      },
      {
        path: 'task/:id',
        loadComponent: () => import('./components/pages/task-details/task-details.component').then(m => m.TaskDetailsComponent)
      },
      {
        path: 'post-task',
        loadComponent: () => import('./components/pages/post-task/post-task.component').then(m => m.PostTaskComponent)
      },
      {
        path: 'my-tasks',
        loadComponent: () => import('./components/pages/my-tasks/my-tasks.component').then(m => m.MyTasksComponent)
      },
      {
        path: 'applications',
        loadComponent: () => import('./components/pages/applications/applications.component').then(m => m.ApplicationsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/pages/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
