import { Component, OnInit } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { DataService } from '../data.service';
import { MainProjectService } from '../services/main-project.service';


@Component({
  selector: 'app-create-main-project',
  templateUrl: './create-main-project.component.html',
  styleUrls: ['./create-main-project.component.scss']
})
export class CreateMainProjectComponent implements OnInit {
  projectName:string;
  userID:any;
  constructor(private dataService: DataService,private router: Router, private mainProjectService: MainProjectService) { 
    this.userID = sessionStorage.getItem('email');
  }

  ngOnInit() {
  }
  logout(){
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
  create() {
    console.log(this.projectName);
    this.mainProjectService.createMainProject(this.projectName).subscribe(s => {
      console.log(s);
      if (s.success) {
        // do project create notification
      } else {
        // show error
      }
    });
  }

}
