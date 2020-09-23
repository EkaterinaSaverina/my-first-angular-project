import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { 
    path: 'login', 
    loadChildren: () => 
    import('./login/login.module').then(m => m.LoginModule),
  },
  { 
    path: 'dashboard', 
    canActivate: [AuthGuard],
    loadChildren: () => 
    import('./dashboard/dashboard.module').then(m => m.DashboardModule),
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
