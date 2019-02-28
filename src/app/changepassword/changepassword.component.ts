import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service.service";
import {FormControl, Validators} from '@angular/forms';
import { CanActivate , Router } from '@angular/router';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  hideold = true;
  hidenew = true;
  hideverify = true;
  emailaddress: string;
  oldPassword:string;
  newPassword:string;
  userID:string;
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  constructor(private loginServeice : LoginServiceService, private router: Router) {
    this.userID = sessionStorage.getItem('email');
    this.userID = this.loginServeice.getUID();
    console.log("uid",this.userID);
   }
  submit(){
    this.loginServeice.changePassword(this.userID,this.emailaddress,this.oldPassword,this.newPassword).subscribe((data:any)=>{
      console.log(data);
    });
  }
  ngOnInit() {
  }
  logout(){
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
}
