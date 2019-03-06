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
  userEmail:string;
  user : any;
  email = new FormControl('', [Validators.required, Validators.email]);

   getErrorMessage() {
     return this.email.hasError('required') ? 'You must enter a value' :
         this.email.hasError('email') ? 'Not a valid email' :
             '';
   }
   
  constructor(private loginServeice : LoginServiceService, private router: Router, private flashMessageService: FlashMessagesService) {
    
   }
   
  ngOnInit() {
  }
  submit(){
    sessionStorage.setItem('email',this.emailaddress);
    if (this.emailaddress === '' || this.emailaddress === null || this.password === '' || this.password == null) {
      this.flashMessageService.show('Enter Login credentials', {cssClass: 'alert-danger', timeout: 1000});
    }
    else{
      this.loginServeice.login(this.emailaddress,this.password).subscribe((data: any) => {
        console.log("usertype",data.msg[2].user_type[0],data.msg[2].approvalStatus[0]);
        if(data.success){
          this.userID = data.msg[0];
          this.accessToken = data.msg[1];
          this.user = data.msg[2];
          console.log(this.user);
          sessionStorage.setItem('accessToken',this.accessToken);
          sessionStorage.setItem('userID',this.userID);
          sessionStorage.setItem('email',this.user.email);
          console.log(sessionStorage.getItem('userID'));
          if(data.msg[2].user_type[0]==="user" && data.msg[2].approvalStatus[0]==="approved"){
            this.router.navigateByUrl('/search');
          }
          else if(data.msg[2].user_type[0]==="admin" && data.msg[2].approvalStatus[0]==="approved"){
            this.router.navigateByUrl('/admin');
          }  
          else if(data.msg[2].user_type[0]==="sudo"){
            
            this.router.navigateByUrl('/admin');
          }   
          else if(data.msg[2].approvalStatus[0]==="pending"){
            this.flashMessageService.show('your account is still pending approval', {cssClass: 'alert-danger', timeout: 1000});
          }       
          console.log(data);
        }else{
          this.flashMessageService.show('wrong login credentials!', {cssClass: 'alert-danger', timeout: 1000});
        }
      },(error: any) => {
        this.flashMessageService.show('wrong login credentials!', {cssClass: 'alert-danger', timeout: 1000});
      });
    }
    
    
    
  }
  
  
}
