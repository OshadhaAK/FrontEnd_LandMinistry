import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service.service";
import { ActivatedRoute, Params , Router } from '@angular/router';
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
  email :string;
  constructor(private loginServeice : LoginServiceService,private activatedRoute: ActivatedRoute, private router: Router) { 
    //console.log("sfvsf",this.token);
    this.userID = sessionStorage.getItem('email');
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['token'];
      this.email = params['useremail'];
      console.log("paramtoken",token,this.email); 
      this.loginServeice.verifyToken(token).subscribe((data:any)=>{
          if(data.success){
            alert("change your password");
            this.token=token;
          }else{
            alert("Not autherized to change the password");
            this.router.navigate(['/forgotpassword']);
          }
      },(error: any) => {
        alert('invalid email!');
        this.router.navigate(['/login']);
    });
  });
  }
  resetPassword(){
    this.loginServeice.resetPassword(this.token,this.newPassword,this.verifyPassword,this.email).subscribe((data:any)=>{
      console.log("resetpassword",data);
      this.router.navigate(['/login']);
    });
  }
  ngOnInit() {
  }

}
