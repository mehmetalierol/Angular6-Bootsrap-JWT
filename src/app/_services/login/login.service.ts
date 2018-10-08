import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  readonly rootUrl = 'http://localhost:61025';
  constructor(private http: HttpClient) { }

    userAuthentication(userName, password) {
      var data2 =[{
        "email": userName,
        "password": password
        }];

    const reqheaders = new HttpHeaders({'No-Auth':'True', 'Content-Type': 'application/json'});
    //reqHeader.append('Content-Type', 'application/json');
    return this.http.post(this.rootUrl + '/Authentication/LoginAsync?Email='+userName+"&password="+password, '', {headers: reqheaders});
  }
}