import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LanguagesService {
  readonly rootUrl = 'http://localhost:52609';
  constructor(private http: HttpClient) { }

    getLanguages() {
      return this.http.get(this.rootUrl + '/Languages/GetAll');
  }
}