import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserNoAuthenticateGuard } from './services/guards/user-no-authenticate.guard';
import { UserAuthenticatedGuard } from './services/guards/user-authenticated.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UserNoAuthenticateGuard] },
  { path: '', component: DashboardComponent, canActivate: [UserAuthenticatedGuard],
    children: [
      { path: 'register', component: RegisterComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
