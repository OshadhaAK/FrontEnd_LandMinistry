import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { LoginServiceService } from "../../services/login-service.service";
import { CanActivate , Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
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
  constructor(private loginServeice : LoginServiceService, private router: Router, private flashMessageServie: FlashMessagesService) { }
  

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  ngOnInit() {
  }
  submit(){
    if(this.emailaddress === '' || this.emailaddress === null || this.password === '' || this.password == null || this.telno ===null || this.name === '' || this.name === null || this.category === '' || this.category === null || this.user_type === '' || this.user_type === null){
  }
}
