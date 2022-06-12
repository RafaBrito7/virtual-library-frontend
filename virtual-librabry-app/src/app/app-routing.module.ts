import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserNoAuthenticateGuard } from './services/guards/user-no-authenticate.guard';
import { UserAuthenticatedGuard } from './services/guards/user-authenticated.guard';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UserNoAuthenticateGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: DashboardComponent, canActivate: [UserAuthenticatedGuard],
    children: [
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: 'users', component: UsersComponent, canActivate: [UserAuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
