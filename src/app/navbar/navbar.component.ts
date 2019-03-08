import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  email : string;
  constructor(private router : Router) {
    this.email = sessionStorage.getItem('email');
   }

  ngOnInit() {
  }

  logout(){
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }

}
