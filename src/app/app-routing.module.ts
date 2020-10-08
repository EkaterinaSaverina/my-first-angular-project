import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'boards/:boardId',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./board/board.module').then(m => m.BoardModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
