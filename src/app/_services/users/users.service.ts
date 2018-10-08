import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { usersModel } from '../../_models/usersModel';

@Injectable()
export class UsersService {
  readonly rootUrl = 'http://localhost:61025';
  constructor(private http: HttpClient) { }

    getAllUsers() {
      return this.http.get(this.rootUrl + '/User/GetAll');
    }

    getAllRoles() {
      return this.http.get(this.rootUrl + '/Role/GetAll');
    }

    getUserById(id: string) {
      return this.http.get(this.rootUrl + '/User/FindUserWithRolesByIdAsync?id=' + id);
    }

    getRoleByName(name: string) {
      return this.http.get(this.rootUrl + '/Role/FindRoleByNameAsync?roleName=' + name);
    }

    addUser(user: usersModel) {
      user.languageId = user.language;
      user.language=null;
      return this.http.post(this.rootUrl + '/User/AddAsync', JSON.stringify(user));
    }

    addRoleToUser(userid: string, roleid: string) {
      console.log(roleid);
      return this.http.post(this.rootUrl + '/User/AddUserRoleAsync?userid=' + userid + '&roleid=' + roleid, '');
    }

    updateUser(user: usersModel) {
      return this.http.post(this.rootUrl + '/User/UpdateAsync', JSON.stringify(user));
    }

    changePassword(user: usersModel) {
      return this.http.post(this.rootUrl + '/User/ChangePasswordAsAdminAsync', JSON.stringify(user));
    }

    deleteUser(id: string)
    {
      return this.http.post(this.rootUrl + '/User/DeleteUserAsync?id=' + id, '')
    }

    deleteRoleFromUser(userid: string, roleid: string)
    {
      return this.http.post(this.rootUrl + '/User/DeleteUserRoleAsync?userid=' + userid + '&roleid=' + roleid, '')
    }
}