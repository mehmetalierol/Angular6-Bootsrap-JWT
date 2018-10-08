import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../_services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  isLoginError : boolean = false;
  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(userName,password){
      this.loginService.userAuthentication(userName,password).subscribe((data : any)=>{
        if(data.statusCode == 200)
        {
          localStorage.setItem('token',data.data.token);
          localStorage.setItem('user',data.data.userDto);
          this.router.navigateByUrl('/home');
        }
        else
        {
           this.isLoginError = true;
        }
      },
      (err : HttpErrorResponse)=>{
        this.isLoginError = true;
      });
  }

}