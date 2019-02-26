import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { LoginServiceService } from "../../services/login-service.service";
import { CanActivate , Router } from '@angular/router';
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
    if (this.emailaddress === '' || this.emailaddress === null || this.password === '' || this.password == null) {
      alert('please enter login credentials');
      this.router.navigate(['/login']);
    }
    else{
      this.loginServeice.login(this.emailaddress,this.password).subscribe((data: any) => {
        console.log(data);
        if(data){
          console.log(data);
        }else{
          //alert('wrong login credentials!');
          this.router.navigate(['/login']);
        }
      },(error: any) => {
          alert('Wrong login credentials!');
          this.router.navigate(['/login']);
      });
    }
    
    
    
  }
  
  
}
