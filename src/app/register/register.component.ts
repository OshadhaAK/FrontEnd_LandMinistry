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
  verifyPassword : string;
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
      this.flashMessageServie.show('Please fill all the details', {cssClass: 'alert-danger', timeout: 3000})
    }

    if(this.password===this.verifyPassword){
      this.loginServeice.createUser(this.emailaddress,this.telno,this.name,this.password,this.category,this.user_type).subscribe((data:any)=> {
        this.flashMessageServie.show('Successfully Registered!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      });
    }
    else{
      this.flashMessageServie.show('Passwords do not match!', {cssClass: 'alert-danger', timeout: 3000});
    }
    
  }
}
