import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  email : string;
  category:string;
  user_type:string;
  showCreate:boolean=false;
  setAdminAsHome:boolean=false;
  constructor(private router : Router) {
    this.email = sessionStorage.getItem('email');
    this.category = sessionStorage.getItem('category');
    if(this.category==="Ministry of Land"){
      this.showCreate=true;
    }
    this.user_type = sessionStorage.getItem('user_type');
    if(this.user_type==="admin"){
      this.setAdminAsHome=true;
    }
   }

  ngOnInit() {
  }

  logout(){
    console.log("cli1");
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }

}
