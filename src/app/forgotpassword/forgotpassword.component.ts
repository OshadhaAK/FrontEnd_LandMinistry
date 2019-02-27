import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { LoginServiceService } from "../../services/login-service.service";
import { CanActivate , Router } from '@angular/router';
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
  constructor(private loginServeice : LoginServiceService, private router: Router) { 

  }
  
  ngOnInit() {
  }
  submit(){
    if(this.emailaddress === null || this.emailaddress === 'undefined' ){
      console.log(this.emailaddress);
      alert('please enter login credentials');
      this.router.navigate(['/forgotpassword ']);
    }
    else{
      console.log('asd',this.emailaddress);
    }
    
  }
}
