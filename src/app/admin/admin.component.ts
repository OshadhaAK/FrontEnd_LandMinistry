import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service.service";
import { CanActivate , Router } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material';
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
  constructor(private loginServeice : LoginServiceService, private router: Router) {
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

  
}
