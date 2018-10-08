import { Component, OnInit } from '@angular/core';
import { usersModel } from '../../_models/usersModel';
import { UsersService } from '../../_services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  user = new usersModel;
  id: string; 
  isError: boolean;
  message: string;

  constructor(private userService: UsersService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => this.id = params.id );
   }

  ngOnInit() {
     this.userService.getUserById(this.id).subscribe((data: any) => {
         this.user = data.data;
     });
  }

  OnSubmit(user: usersModel){
    user.newPassword = user.password;
    this.userService.changePassword(user).subscribe((data: any) => {
      if(data.statusCode == 200)
      {
        this.router.navigate(['/home', {msg: 'updateOk', userN: this.user.userName}]);
        this.isError = false;
      }
      else
      {
        this.isError = true;
         this.message = data.message;
      }
  });
  }

}
