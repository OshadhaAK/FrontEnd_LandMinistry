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
  userEmail:string;
  user : any;
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
    sessionStorage.setItem('email',this.emailaddress);
    if (this.emailaddress === '' || this.emailaddress === null || this.password === '' || this.password == null) {
      alert('please enter login credentials');
      this.router.navigate(['/login']);
    }
    else{
      this.loginServeice.login(this.emailaddress,this.password).subscribe((data: any) => {
        console.log("usertype",data.msg[2].user_type[0],data.msg[2].approvalStatus[0]);
        if(data.success){
          this.userID = data.msg[0];
          this.accessToken = data.msg[1];
          this.user = data.msg[2];
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
          else if(data.msg[2].approvalStatus[0]==="pending"){
            alert("your account is still pending approval");
          }       
          console.log(data);
        }else{
          alert('wrong login credentials!');
          this.router.navigate(['/login']);
        }
      },(error: any) => {
          alert('Wrong login credentials!');
          this.router.navigate(['/login']);
      });
    }
    
    
    
  }
  
  
}
