import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./shared/dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      { path: 'teams', loadComponent: () => import('./features/teams/teamsList/teams').then(m => m.TeamsComponent) },
      { path: 'team/:teamId/projects', loadComponent: () => import('./features/projects/project-list/project-list').then(m => m.ProjectList) },
      { path: 'all-projects', loadComponent: () => import('./features/projects/all-projects/all-projects').then(m => m.AllProjects) },
      { path: 'team/:teamId/projects/:projectId/tasks', loadComponent: () => import('./features/tasks/tasks-list/tasks-list').then(m => m.TasksList) }

    ]
  },
  {
    path: '**',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  }
];