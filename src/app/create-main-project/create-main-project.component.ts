import { Component, OnInit } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { DataService } from '../data.service';
import { MainProjectService } from '../services/main-project.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-create-main-project',
  templateUrl: './create-main-project.component.html',
  styleUrls: ['./create-main-project.component.scss']
})
export class CreateMainProjectComponent implements OnInit {
  projectName:string;
  userID:any;
  constructor(private dataService: DataService,private router: Router, private mainProjectService: MainProjectService,private flashMessageServie : FlashMessagesService) { 
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
        this.flashMessageServie.show('Main Project Created Succesfully.Please add your sub projects', {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/createproject']);
      } else {
        // show error
        this.flashMessageServie.show(s.msg, {cssClass: 'alert-danger', timeout: 3000})
      }
    });
  }

}
