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
  constructor(private loginServeice : LoginServiceService,private activatedRoute: ActivatedRoute, private router: Router) { 
    console.log(this.token);
    this.userID = sessionStorage.getItem('email');
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['token'];
      console.log(token); 
      this.loginServeice.verifyToken(token).subscribe((data:any)=>{
          if(data.success){
            alert("change your password");
            this.router.navigateByUrl('/resetpassword');
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
    this.loginServeice.resetPassword(this.token,this.newPassword,this.verifyPassword).subscribe((data:any)=>{
      console.log("resetpassword",data);
      
    });
  }
  ngOnInit() {
  }

}
