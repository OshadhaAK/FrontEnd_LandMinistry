import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service.service";
import { CanActivate , Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  color = 'primary';
  checked = false;
  disabled = false;
  detailSet: any;
  userID : any;
  approvelist: any;
  approved: any;
  rejectlist : any;
  discard = true;
  email : any;

  /* Register account fields */
  regEmail = new FormControl('', [Validators.required, Validators.email]);
  name: string;
  emailaddress: string;
  password: string;
  telno: number;
  category: string;
  user_type:string;
  verifyPassword:string;
  hide=true;

  constructor(private loginServeice : LoginServiceService, private router: Router,private flashMessageServie : FlashMessagesService) {
    this.userID = sessionStorage.getItem('userID');
    this.email = sessionStorage.getItem('email');
    this.loginServeice.getPendingUsers().subscribe((data:any)=>{
      this.detailSet = data.msg;
        
    });
    this.loginServeice.getApprovedUsers().subscribe((data:any)=>{
      this.approvelist = data.msg;
      
    });
    console.log("token",this.loginServeice.getAuthToken());
    this.loginServeice.getRejectedUsers().subscribe((data:any)=>{
      this.rejectlist = data.msg;
      
    });
   }
  
  ngOnInit() {
  }
  logout(){
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
  approve(i: any){
    this.loginServeice.approveUser(this.detailSet[i].uid).subscribe((data:any)=>{
      this.loginServeice.getApprovedUsers().subscribe((data:any)=>{
        this.approvelist = data.msg;
    
      });
      console.log("approve user");
      this.loginServeice.getPendingUsers().subscribe((data:any)=>{
        this.detailSet = data.msg;
          
      });
      this.loginServeice.getRejectedUsers().subscribe((data:any)=>{
        this.rejectlist = data.msg;
    
      });
    });
    this.discard=false;
  }

  reject(i: any){
    console.log("reject user clicked");
    console.log(i,this.detailSet[i].email);
    this.loginServeice.rejectUser(this.detailSet[i].uid).subscribe((data:any)=>{

      this.loginServeice.getApprovedUsers().subscribe((data:any)=>{
        this.approvelist = data.msg;
        
      });
      console.log(data,"user rejected");
      this.loginServeice.getPendingUsers().subscribe((data:any)=>{
        this.detailSet = data.msg;
          
      });

      this.loginServeice.getRejectedUsers().subscribe((data:any)=>{
        this.rejectlist = data.msg;
    
      });
    });
    this.discard=false;
  }

  deletefromApprovedList(i: any){
    console.log(i,this.approvelist[i].email);
    this.loginServeice.deleteUser(this.approvelist[i].uid).subscribe((data:any)=>{

      this.loginServeice.getApprovedUsers().subscribe((data:any)=>{
        this.approvelist = data.msg;
        
      });
      console.log(data,"user deleted");
      this.loginServeice.getPendingUsers().subscribe((data:any)=>{
        this.detailSet = data.msg;
          
      });

      this.loginServeice.getRejectedUsers().subscribe((data:any)=>{
        this.rejectlist = data.msg;
    
      });
    });
    this.discard=false;
  }

  deletefromRejectedList(i: any){
    console.log(i,this.rejectlist[i].email);
    this.loginServeice.deleteUser(this.rejectlist[i].uid).subscribe((data:any)=>{

      this.loginServeice.getApprovedUsers().subscribe((data:any)=>{
        this.approvelist = data.msg;
        
      });
      console.log(data,"user deleted");
      this.loginServeice.getPendingUsers().subscribe((data:any)=>{
        this.detailSet = data.msg;
          
      });

      this.loginServeice.getRejectedUsers().subscribe((data:any)=>{
        this.rejectlist = data.msg;
    
      });
    });
    this.discard=false;
  }

  createAcc(){
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

  getErrorMessage() {
    return this.regEmail.hasError('required') ? 'You must enter a value' :
        this.regEmail.hasError('email') ? 'Not a valid email' :
            '';
  }


}
