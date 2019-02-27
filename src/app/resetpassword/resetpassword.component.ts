import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service.service";
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  hidenew = true;
  hideverify = true;
  token:string;
  newPassword:string;
  verifyPassword:string;
  userID: any;
  constructor(private loginServeice : LoginServiceService) { 
    console.log(this.token);
    this.userID = sessionStorage.getItem('email');
  }
  resetPassword(){
    this.loginServeice.resetPassword(this.token,this.newPassword,this.verifyPassword).subscribe((data:any)=>{
      console.log("resetpassword",data);
      
    });
  }
  ngOnInit() {
  }

}
