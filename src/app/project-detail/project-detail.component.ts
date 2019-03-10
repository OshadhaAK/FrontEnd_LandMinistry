import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FileService } from '../services/file.service';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../data.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  state = 'switch';
  userID: any;
  projectID: any;
  constructor(private router: Router,
              private fileService: FileService,
              private route: ActivatedRoute,
              private dataService: DataService) {

    this.userID = sessionStorage.getItem('email');
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectID = params.get('id');
      this.fileService.getProjectFiles(this.projectID).subscribe(res => {
        if (res.success) {
          res.msg.forEach(fileId => {
            this.fileService.getFileInfo(fileId).subscribe(data => {
              console.log(data);
            });
          });
        }
      });
      this.dataService.getProjectStage(this.projectID).subscribe(msg => {
        console.log('current stage', msg);
      })
      this.dataService.getNextStage(this.projectID).subscribe(msg => {
        console.log('next stage', msg);
      });
    });
  }
  logout() {
    sessionStorage.clear();
    console.log('erase session', sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
}
