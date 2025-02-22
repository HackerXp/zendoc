import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AuthComponent } from '@features/auth/auth.component';
import { RootComponent } from '@layouts/root/root.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: '',
    component: RootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dash',
        loadComponent: () =>
          import('@features/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('@features/documents/documents.component').then(
            (c) => c.DocumentsComponent
          ),
      },
      {
        path: 'configurations',
        loadComponent: () =>
          import('@features/configurations/configurations.component').then(
            (c) => c.ConfigurationsComponent
          ),
      },

      {
        path: 'configurations/profiles',
        loadComponent: () =>
          import(
            '@features/configurations/configurations-profiles/configurations-profiles.component'
          ).then((c) => c.ConfigurationsProfilesComponent),
      },
      {
        path: 'configurations/permissions',
        loadComponent: () =>
          import(
            '@features/configurations/configurations-permission/configurations-permission.component'
          ).then((c) => c.ConfigurationsPermissionComponent),
      },
      {
        path: 'configurations/category',
        loadComponent: () =>
          import(
            '@features/configurations/configurations-category/configurations-category.component'
          ).then((c) => c.ConfigurationsCategoryComponent),
      },
      {
        path: 'configurations/department',
        loadComponent: () =>
          import(
            '@features/configurations/configurations-department/configurations-department.component'
          ).then((c) => c.ConfigurationsDepartmentComponent),
      },
      {
        path: 'view/:id',
        loadComponent: () =>
          import('./shared/components/pdf-viewer/pdf-viewer.component').then(
            (c) => c.PdfViewerComponent
          ),
      },
    ],
  },
];
