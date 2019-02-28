import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service.service";
import { CanActivate , Router } from '@angular/router';
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
  constructor(private loginServeice : LoginServiceService, private router: Router) {
    this.userID = sessionStorage.getItem('email');
    this.loginServeice.getPendingUsers().subscribe((data:any)=>{
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
