import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../_services/users/users.service';
import { usersModel } from "../_models/usersModel";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataTable: any;
  isError: boolean = false;
  users: usersModel;
  msg: string;
  userN: string;
  toBeDeleted: string;
  constructor(private router: Router, private userService: UsersService, private route: ActivatedRoute, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers()
  {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data.data;
      this.chRef.detectChanges();

    const table: any = $('table');
    this.dataTable = table.DataTable();
    });
    this.route.params.subscribe( params => {this.msg = params.msg, this.userN = params.userN} );
  }

  deleteUser()
  {
    this.userService.deleteUser(this.toBeDeleted).subscribe((data: any) => {
        if(data.statusCode == 200)
        {
          this.router.navigate(['/home', {msg: 'deleteOk'}]);
          this.getAllUsers();
          this.isError =false;
        }
        else
        {
          this.isError =true;
          this.router.navigate(['/home', {msg: 'Kullanıcı silinemedi! Hata : ' + data.message}]);
        }
    });
  }
}
