import { Component, OnInit, ChangeDetectorRef, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FileService } from '../services/file.service';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProjectData } from '../project-data';
import { FileInfo } from '../file-info';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/services/login-service.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  state = 'switch';
  hasPermission = false;
  stageApproved = false;
  currentState: string;
  currentStageInput: string;
  nextStages: Array<ProjectData>;
  nextStage: string;
  currentProject: ProjectData;
  projectFiles: Array<FileInfo>;
  userID: any;
  projectID: any;
  fileToUpload: File = null;
  readyToSend = false;
  amount = 0;

  pdfFormGroup = this.formBuilder.group({
    file: [null, Validators.required]
  });
  constructor(private router: Router,
              private fileService: FileService,
              private route: ActivatedRoute,
              private dataService: DataService,
              private falshMessageService: FlashMessagesService,
              private formBuilder: FormBuilder,
              private loginServie: LoginServiceService) {

    this.userID = sessionStorage.getItem('email');
   }
  ngOnInit() {
    this.projectFiles = [];
    this.nextStages = [];
    this.route.paramMap.subscribe(params => {
      this.projectID = params.get('id');
      this.dataService.getProjectInfo(this.projectID).subscribe(res => {
        if (res.success) {
          this.currentProject = res.msg;
        } else {
          this.falshMessageService.show('Something went wrong!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
      // get the list of all the files currently available
      this.fileService.getProjectFiles(this.projectID).subscribe(res => {
        if (res.success) {
          res.msg.forEach(fileId => {
            this.fileService.getFileInfo(fileId).subscribe(s => {
              if (s.success) {
                this.projectFiles.push(s.msg);
              } else {
                this.falshMessageService.show('Something went wrong!', {cssClass: 'alert-danger', timeout: 3000});
              }
            });
          });
        } else {
          this.falshMessageService.show('Something went wrong!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
      // get current stage info (permission , option:pdf, boolean)
      this.dataService.getProjectStage(this.projectID).subscribe(res => {
        if (res.success) {
          const stage = res.msg;
          this.currentState = stage;
          this.dataService.getStageInfo(stage).subscribe(msg => {
            if (msg.success) {
              this.currentStageInput = msg.msg.option;
              console.log(this.currentStageInput)
              this.hasPermission = this.loginServie.getUserType() === msg.msg.permission;
            }
          });
        }
      });
      // get the next stage
      this.dataService.getNextStage(this.projectID).subscribe(msg => {
        if (msg.success) {
          this.nextStages = msg.msg;
          this.nextStage = `${this.nextStages[0]}`;
        } else {
          this.falshMessageService.show('Something went wrong!', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  onApprove() {
    this.falshMessageService.show('Current stage approved', {cssClass: 'alert-success', timeout: 3000});
    this.stageApproved = true;
  }

  currentStageApprove() {
    this.readyToSend = !this.readyToSend;
  }

  valueChange() {
    this.readyToSend = (this.amount > 0);
  }

  changeNext(i){
  }

  onFileClick(id) {
    const file = this.projectFiles[id];
    window.open(`http://localhost:3301/files/file?fileId=${file.fileId}`, '_blank');
  }

  onSubmit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.readyToSend = true;
}

  _sendtoNextStage() {
    this.dataService.sendToNextStage(this.projectID, this.nextStage).subscribe(r => {
      if (r.success) {
        // reload the page
        this.falshMessageService.show('Project send to next stage', {cssClass: 'alert-success', timeout: 3000});
        window.location.reload();
      } else {
        this.falshMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  sendToNextStage() {
    console.log(this.nextStage);
    if (this.currentStageInput === 'pdf') {
      this.fileService.uploadFile(this.projectID, this.fileToUpload).subscribe(res => {
        if (res.success) {
          // send to next stage
          this._sendtoNextStage();
        } else {
          this.falshMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    } else if (this.currentStageInput === 'boolean') {
      this._sendtoNextStage();
    } else if (this.currentStageInput === 'typing') {
      this.dataService.enterPaymentData(this.projectID, this.amount).subscribe(res => {
        if (res.success) {
          // send to next stage
          this._sendtoNextStage();
        } else {
          this.falshMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
