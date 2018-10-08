import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../_services/users/users.service';
import { usersModel } from '../../_models/usersModel';
import { rolesModel } from '../../_models/rolesModel';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  isSuccess: boolean =false;
  isError: boolean = false;
  pageMessage: string;
  user = new usersModel;
  roles: rolesModel;
  id: string; 
  selectedRole: string;
  constructor(private userService: UsersService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => this.id = params.id );
   }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails()
  {
    this.userService.getUserById(this.id).subscribe((data: any) => {
        this.user = data.data;
    });

    this.userService.getAllRoles().subscribe((data: any) => {
     this.roles = data.data;
 });
  }

  deleteUser(id: string)
  {
    this.userService.deleteUser(id).subscribe((data: any) => {
      this.router.navigate(['/home', {msg: 'deleteOk'}]);
  });
  }

  deleteRol(userid: string, rolename: string)
  {
    this.userService.getRoleByName(rolename).subscribe((data: any) => {
      if(data.statusCode == 200)
      {
         this.userService.deleteRoleFromUser(userid, data.data.id).subscribe((subData: any) =>{
            if(subData.statusCode == 200)
            {
              this.getUserDetails();
              this.isSuccess = true;
              this.isError= false;
              this.pageMessage = 'Kullanıcıdan rol silindi.';
            }
            else{
              this.isError=true;
              this.isSuccess = false;
              this.pageMessage = subData.message;
            }
         });
      }
      else{
        this.isError=true;
        this.isSuccess = false;
        this.pageMessage = data.message;
      }
    });
  }

  addRole(userid: string)
  {
      this.userService.addRoleToUser(userid, this.selectedRole).subscribe((data: any) => {
          if(data.statusCode == 200)
          {
            this.getUserDetails();
            this.isSuccess = true;
            this.isError= false;
            this.pageMessage = 'Kullanıcıya rol eklendi.';
          }
          else{
            this.isError=true;
            this.isSuccess = false;
            this.pageMessage = data.message;
          }
      });
  }
}
