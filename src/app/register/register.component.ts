import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { LoginServiceService } from "../../services/login-service.service";
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
  constructor(private loginServeice : LoginServiceService) { }
  

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  ngOnInit() {
  }
  submit(){
    this.loginServeice.createUser(this.emailaddress,this.telno,this.name,this.password,this.category,this.user_type).subscribe((data:any)=> {
      alert('Sussecfully Registered!')
    });
  }
}
