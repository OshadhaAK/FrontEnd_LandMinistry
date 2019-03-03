import { Component, OnInit } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { DataService } from '../data.service';
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

  constructor(private dataService: DataService,private router: Router) { 
    this.userID = sessionStorage.getItem('email');
  }

  ngOnInit() {
    this.dataService.search(this.projectName, this.division, this.landUser, this.lotID, null).subscribe(s => {
      if (s.success) {
        s.msg.forEach(project => {
          this.projectNames.push(project.projectName);
          this.divisions.push(project.division);
          this.lotIDs.push(project.lotId);
          this.landUsers.push(project.landUser);
          this.mainProjectNames.push(project.mainProjectName);
        });
      }
    })
  }
  logout(){
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
  create(){
    if (this.projectName === '' || this.projectName === null || this.division === '' || this.division == null  || this.lotID === '' || this.lotID == null || this.landUser === '' || this.landUser == null) {
      alert('please enter project details');
      this.router.navigate(['/createproject']);
    }
    else{
      console.log(this.mainProjectName);
      this.dataService.createProject(this.projectName,this.division,this.landUser,this.lotID,this.mainProjectName).subscribe((data:any)=>{
        console.log(data)
        alert("Project Created Successfully!")
        this.router.navigate(['/createproject']);
      },(error: any) => {
        alert('Wrong project details!');
        this.router.navigate(['/createproject']);
    });
    }

  }
}
