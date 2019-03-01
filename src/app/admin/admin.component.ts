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
  discard = true;
  constructor(private loginServeice : LoginServiceService, private router: Router) {
    this.userID = sessionStorage.getItem('email');
    this.loginServeice.getPendingUsers().subscribe((data:any)=>{
      this.detailSet = data.msg;
        //console.log(data);
    });
    this.loginServeice.getApprovedUsers().subscribe((data:any)=>{
      this.approvelist = data.msg;
      //console.log(data);
    });
    console.log("token",this.loginServeice.getAuthToken());
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
        //console.log(data);
      });
      console.log("approve user");
      this.loginServeice.getPendingUsers().subscribe((data:any)=>{
        this.detailSet = data.msg;
          //console.log(data);
      });
    });
    this.discard=false;
    //this.router.navigate(['/admin']);
  }

  delete(i: any){
    console.log(i,this.approvelist[i].email);
    this.loginServeice.deleteUser(this.approvelist[i].uid).subscribe((data:any)=>{

      this.loginServeice.getApprovedUsers().subscribe((data:any)=>{
        this.approvelist = data.msg;
        
      });
      console.log(data,"user deleted");
      this.loginServeice.getPendingUsers().subscribe((data:any)=>{
        this.detailSet = data.msg;
          
      });
    });
    this.discard=false;
  }
}
