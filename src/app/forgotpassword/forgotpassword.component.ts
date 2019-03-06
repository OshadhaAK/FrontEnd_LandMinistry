import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { LoginServiceService } from "../../services/login-service.service";
import { ActivatedRoute, Params , Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  emailaddress: string;
  userID:any;
  accessToken:any;
  email = new FormControl('', [Validators.required, Validators.email]);

   getErrorMessage() {
     return this.email.hasError('required') ? 'You must enter a value' :
         this.email.hasError('email') ? 'Not a valid email' :
             '';
   }
  constructor(private loginServeice: LoginServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private flashMessageService: FlashMessagesService) { }
  
  ngOnInit() {
  }
  submit(){    
    if(this.emailaddress === null || this.emailaddress === '' || this.emailaddress=== undefined ){
      this.flashMessageService.show('please enter your email address', {cssClass: 'alert-danger', timeout: 1000});
    }
    else{
      sessionStorage.setItem('email',this.emailaddress);
      this.loginServeice.forgotPassword(this.emailaddress).subscribe((data:any)=>{
        if(data.success){
          this.flashMessageService.show('verify your email address', {cssClass: 'alert-danger', timeout: 1000});
        }
        else{
          this.flashMessageService.show('Unauthorized access!', {cssClass: 'alert-danger', timeout: 1000});
        }
        
      },(error: any) => {
        this.flashMessageService.show('Unauthorized access!', {cssClass: 'alert-danger', timeout: 1000});
    });

      
    }
    
  }
}
