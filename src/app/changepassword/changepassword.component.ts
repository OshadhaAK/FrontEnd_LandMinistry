import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service.service";
import {FormControl, Validators} from '@angular/forms';
import { CanActivate , Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
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
  
  constructor(private loginServeice : LoginServiceService, private router: Router, private flashMessageService: FlashMessagesService) {
    this.email = sessionStorage.getItem('email');
    this.userID = this.loginServeice.getUID();
    console.log("uid",this.userID);
    console.log("email",this.email);
   }
  submit(){
    if(this.newPassword===this.verifyPassword){
      this.loginServeice.changePassword(this.userID,this.email,this.oldPassword,this.newPassword).subscribe((data:any)=>{
        console.log(data);
        this.flashMessageService.show('password changed succefully', {cssClass: 'alert-success', timeout: 1000});
        this.logout();
      });
    }
    else{
      this.flashMessageService.show('passwords do not match', {cssClass: 'alert-danger', timeout: 1000});

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
