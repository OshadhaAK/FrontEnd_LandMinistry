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
      // get the list of all the files currently available
      this.fileService.getProjectFiles(this.projectID).subscribe(res => {
        if (res.success) {
          res.msg.forEach(fileId => {
            this.fileService.getFileInfo(fileId).subscribe(data => {
              console.log(data);
            });
          });
        }
      });
      // get current stage info (permission , option:pdf, boolean)
      this.dataService.getProjectStage(this.projectID).subscribe(res => {
        if (res.success) {
          const stage = res.msg;
          this.dataService.getStageInfo(stage).subscribe(msg => {
            console.log('Current stage info', msg);
          });
        }
      });
      // get the next stage
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
