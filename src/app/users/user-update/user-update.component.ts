import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { usersModel } from '../../_models/usersModel';
import { LanguagesService } from '../../_services/language/languages.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  languages: any;
  isError: boolean;
  message: string;
  user = new usersModel;
  id: string;
  constructor(private userService: UsersService,
              private route: ActivatedRoute,
              private languagesService: LanguagesService,
              private router: Router) 
  {
      this.route.params.subscribe(params => this.id = params.id)
      console.log(this.id);
  }

  ngOnInit() {
    
    this.languagesService.getLanguages().subscribe((data: any) => {
      this.languages = data.data;
    });

    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.user = data.data;
  });
  }

  OnSubmit(user: usersModel){
    this.userService.updateUser(user).subscribe((data: any) => {
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
