import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { LoginServiceService } from "../../services/login-service.service";
import { ActivatedRoute, Params , Router } from '@angular/router';
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
  constructor(private loginServeice : LoginServiceService, private router: Router,private activatedRoute: ActivatedRoute) { 
    
    
  }
  
  ngOnInit() {
  }
  submit(){    
    if(this.emailaddress === null || this.emailaddress === '' || this.emailaddress=== undefined ){
      
      alert('please enter your email address');
      this.router.navigate(['/forgotpassword']);
    }
    else{
      sessionStorage.setItem('email',this.emailaddress);
      this.loginServeice.forgotPassword(this.emailaddress).subscribe((data:any)=>{
        if(data.success){
          alert("Verify your email");
        }
        else{
          alert("Unauthorized access!");
          this.router.navigate(['/forgotpassword']);
        }
        
      },(error: any) => {
        alert('Unauthorized access!');
        this.router.navigate(['/forgotpassword']);
    });

      
    }
    
  }
}
