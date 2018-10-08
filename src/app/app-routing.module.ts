import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { PasswordChangeComponent } from './users/password-change/password-change.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/details/:id', component: UserDetailsComponent, canActivate:[AuthGuard]},
  { path: 'user/add', component: UserAddComponent, canActivate:[AuthGuard]},
  { path: 'user/update/:id', component: UserUpdateComponent, canActivate:[AuthGuard]},
  { path: 'user/change-password/:id', component: PasswordChangeComponent, canActivate:[AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
