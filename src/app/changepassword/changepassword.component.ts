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
  oldPassword:string;
  newPassword:string;
  verifyPassword:string;
  userID:string;
  email : string;
  
  constructor(private loginServeice : LoginServiceService, private router: Router) {
    this.email = sessionStorage.getItem('email');
    this.userID = this.loginServeice.getUID();
    console.log("uid",this.userID);
    console.log("email",this.email);
   }
  submit(){
    if(this.newPassword===this.verifyPassword){
      this.loginServeice.changePassword(this.userID,this.email,this.oldPassword,this.newPassword).subscribe((data:any)=>{
        console.log(data);
        alert("password changed succefully");
        this.logout();
      });
    }
    else{
      alert("passwords do not match");
      this.router.navigate(['/changepassword']);
    }
  }
  ngOnInit() {
  }
  logout(){
    console.log("logout");
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
}
