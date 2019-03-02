import { Component, OnInit } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { FileService } from '../services/file.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  state = "switch";
  userID : any;
  projectID: any;
  constructor(private router: Router, private fileService: FileService) {
    //this.projectID = sessionStorage.getItem('projectID');
    this.userID = sessionStorage.getItem('email');
    this.fileService.getProjectFiles(this.projectID).subscribe((data:any)=>{
      console.log("project files",data)
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
