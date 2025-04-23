import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { detailsResolver } from './core/guards/details.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/ar', pathMatch: 'full' },

  /* Main Layout */
  {
    path: ':lang',
    loadComponent: () =>
      import('../app/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('../app/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('../app/pages/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
              ),
          },
          {
            path: 'posts-list',
            loadComponent: () =>
              import('../app/pages/posts-list/posts-list.component').then(
                (m) => m.PostsListComponent
              ),
          },
          {
            path: 'edit-post/:id',
            loadComponent: () =>
              import(
                '../app/shared/components/edit-add/edit-add.component'
              ).then((m) => m.EditAddComponent),
            resolve: {
              post: detailsResolver,
            },
          },
          {
            path: 'add-post',
            loadComponent: () =>
              import(
                '../app/shared/components/edit-add/edit-add.component'
              ).then((m) => m.EditAddComponent),
          },
        ],
      },
    ],
    canActivate: [authGuard],
  },

  /* Auth Layout */
  {
    path: ':lang',
    loadComponent: () =>
      import('../app/layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('../app/pages/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },

  {
    path: ':lang',
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },
];
