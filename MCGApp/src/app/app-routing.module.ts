import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes =[
  { path: '', redirectTo: 'shared', pathMatch: 'full'},    
  { path: 'dashboard', component: DashboardComponent ,canActivate:[AuthGuard]},
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) ,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
