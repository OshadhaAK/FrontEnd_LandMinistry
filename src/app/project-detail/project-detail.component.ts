import { Component, OnInit } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  state = "switch";
  userID : any;
  constructor(private router: Router) {
    this.userID = sessionStorage.getItem('email');
   }
  
  ngOnInit() {
  }
  logout(){
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
}
