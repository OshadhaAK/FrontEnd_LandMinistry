import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service.service";
import { ActivatedRoute, Params , Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
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
  constructor(private loginServeice : LoginServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private falshMessageService: FlashMessagesService) {

    
    this.userID = sessionStorage.getItem('email');
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['token'];
      this.email = params['useremail'];
      this.loginServeice.verifyToken(token).subscribe((data:any)=>{
          if(data.success){
            this.falshMessageService.show('Please Enter the new password', {cssClass: 'alert-success', timeout: 3000});
            this.token=token;
          }else{
            this.falshMessageService.show('Not authorized to change the password', {cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/forgotpassword']);
          }
      },(error: any) => {
        this.falshMessageService.show('invalid email!', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login']);
    });
  });
  }
  resetPassword(){
    if(this.token ==='' || this.token ==='undefined' || this.newPassword ==='' || this.newPassword ===null || this.verifyPassword ==='' || this.verifyPassword ===null || this.email ==='' || this.email ===null){
      this.falshMessageService.show('Please fill all the fields', {cssClass: 'alert-danger', timeout: 3000});
    }
    else{
      this.loginServeice.resetPassword(this.token,this.newPassword,this.verifyPassword,this.email).subscribe((data:any)=>{
        this.router.navigate(['/login']);
      });
      
    }
    
  }
  ngOnInit() {
  }

}
