import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from "../../services/login-service.service";
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
  constructor(private loginServeice : LoginServiceService) {
    this.userID = sessionStorage.getItem('email');
    
   }
  
  ngOnInit() {
  }

}
