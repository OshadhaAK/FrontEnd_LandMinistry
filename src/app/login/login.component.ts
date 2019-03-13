import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { LoginServiceService } from "../../services/login-service.service";
import { CanActivate , Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  emailaddress: string;
  password: string;
  accessToken: string;
  userID: string ;
  userEmail: string;
  user : any;
  approvalStatus: string;
  email = new FormControl('', [Validators.required, Validators.email]);

   getErrorMessage() {
     return this.email.hasError('required') ? 'You must enter a value' :
         this.email.hasError('email') ? 'Not a valid email' :
             '';
   }

  constructor(private loginServeice: LoginServiceService,
              private router: Router,
              private flashMessageService: FlashMessagesService) {

   }

  ngOnInit() {
    // check user is logged in
    const userType = this.loginServeice.getUserType();
    if (userType !== null) {
      if (this.loginServeice.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/search']);
      }
    }
  }
  submit() {
    sessionStorage.setItem('email', this.emailaddress);
    if (this.emailaddress === '' || this.emailaddress === null || this.password === '' || this.password == null) {
      this.flashMessageService.show('Please enter the Login credentials', {cssClass: 'alert-danger', timeout: 3000});
    } else {
      this.loginServeice.login(this.emailaddress, this.password).subscribe((data: any) => {

        if (data.success) {
          console.log(data);
          this.userID = data.msg[0];
          this.accessToken = data.msg[1];
          this.user = data.msg[2];

          sessionStorage.setItem('accessToken', this.accessToken);
          sessionStorage.setItem('userID', this.userID);
          sessionStorage.setItem('email', this.user.email);
          sessionStorage.setItem('category', this.user.category);
          sessionStorage.setItem('user_type', this.user.user_type);

          if (data.msg[2].user_type[0] === 'user' && data.msg[2].approvalStatus[0] === 'approved') {
            this.router.navigateByUrl('/search');
          } else if (data.msg[2].user_type[0] === 'admin' && data.msg[2].approvalStatus[0] === 'approved') {
            this.router.navigateByUrl('/admin');
          } else if (data.msg[2].user_type[0] === 'sudo') {
            this.router.navigateByUrl('/admin');
          } else if (data.msg[2].approvalStatus[0] === 'pending') {
            this.flashMessageService.show('Your account is still pending approval', {cssClass: 'alert-danger', timeout: 3000});
          }

        } else {
          this.flashMessageService.show('Wrong login credentials!', {cssClass: 'alert-danger', timeout: 3000});
        }
      }, (error: any) => {
        this.flashMessageService.show('Wrong login credentials!', {cssClass: 'alert-danger', timeout: 3000});
      });
    }



  }


}
