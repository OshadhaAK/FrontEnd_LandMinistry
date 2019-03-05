import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { LoginServiceService } from "../../services/login-service.service";
import { CanActivate , Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  name: string;
  emailaddress: string;
  password: string;
  telno: number;
  category: string;
  user_type:string;
  verifyPassword : string;
  constructor(private loginServeice : LoginServiceService, private router: Router) { }
  

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  ngOnInit() {
  }
  submit(){
    if(this.emailaddress === '' || this.emailaddress === null || this.password === '' || this.password == null || this.telno ===null || this.name === '' || this.name === null || this.category === '' || this.category === null || this.user_type === '' || this.user_type === null){
      alert("Please fill all the input fields");
    }
    else{
      if(this.password === this.verifyPassword){
        this.loginServeice.createUser(this.emailaddress,this.telno,this.name,this.password,this.category,this.user_type).subscribe((data:any)=> {
          alert('Succesfully Registered!')
          this.router.navigate(['/login']);
        });
      }
      else{
        alert("Passwords do not match");
      }
      
    }
    
  }
}
