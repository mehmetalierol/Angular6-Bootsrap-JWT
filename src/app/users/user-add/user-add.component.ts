import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { usersModel } from '../../_models/usersModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguagesService } from '../../_services/language/languages.service';
import { UsersService } from '../../_services/users/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  languages: any;
  user = new usersModel();
  isError: boolean;
  message: string;
  id: string; 
  constructor
    ( private route: ActivatedRoute,
      private router: Router,
      private languagesService: LanguagesService,
      private userService: UsersService
    ){ 
    this.route.params.subscribe( params => this.id = params.id );
  }

  ngOnInit() {
    this.languagesService.getLanguages().subscribe((data: any) => {
      this.languages = data.data;
    });
  }

  OnSubmit(user: usersModel){
    this.userService.addUser(user).subscribe((data: any) => {
        if(data.statusCode == 200)
        {
          this.router.navigate(['/home', {msg: 'addOk', userN: this.user.userName}]);
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
