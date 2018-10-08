import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthInterceptor } from './_guards/auth.interceptor';
import { UsersService } from './_services/users/users.service';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { HeaderComponent } from './_shared/header/header.component';
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { LoginService } from './_services/login/login.service';
import { LanguagesService } from './_services/language/languages.service';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { PasswordChangeComponent } from './users/password-change/password-change.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserDetailsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    UserAddComponent,
    UserUpdateComponent,
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoginService, UsersService, LanguagesService, AuthGuard,
    ,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
