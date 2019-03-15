import { Component, OnInit } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectName: string = null;
  division: string = null;
  lotID: any = null;
  landUser: any = null;
  mainProjectName: string = null;
  userID: any = null;

  projectNames = [];
  divisions = [];
  lotIDs = [];
  landUsers = [];
  mainProjectNames = [];

  constructor(private dataService: DataService,private router: Router, private flashMessageServie: FlashMessagesService) { 
    this.userID = sessionStorage.getItem('email');
  }

  ngOnInit() {
    this.dataService.search(this.projectName, this.division, this.landUser, this.lotID, null, this.mainProjectName).subscribe(s => {
      if (s.success) {
        console.log(s);
        s.msg.forEach(project => {
          this.projectNames.push(project.projectName);
          this.divisions.push(project.division);
          this.lotIDs.push(project.lotId);
          this.landUsers.push(project.landUser);
          this.mainProjectNames.push(project.mainProjectName);
        });
      }
    });

    this.dataService.searchMainProject(this.mainProjectName).subscribe(s=>{
      if(s.success){
        console.log(s);
        s.msg.forEach(project =>{
          this.mainProjectNames.push(project.projectName);
        })
      }
    });
    console.log(this.mainProjectNames);

  }
  logout(){
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
  create(){
    if (this.projectName === '' || this.projectName === null || this.division === '' || this.division == null  || this.lotID === '' || this.lotID == null || this.landUser === '' || this.landUser == null) {
      this.flashMessageServie.show('Please Enter Project Details', {cssClass: 'alert-danger', timeout: 3000});
      
      this.router.navigate(['/createproject']);
    }
    else{
      console.log(this.mainProjectName);
      this.dataService.createProject(this.projectName,this.division,this.landUser,this.lotID,this.mainProjectName).subscribe((data:any)=>{
        if(data.success==true){
          console.log(data)
          this.flashMessageServie.show('Project Created Successfully!', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/search']);
        }
        else{
          this.flashMessageServie.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
        
      },(error: any) => {
        this.flashMessageServie.show('Wrong project details!', {cssClass: 'alert-danger', timeout: 1000});
        this.router.navigate(['/createproject']);
    });
    }

  }

  
}
