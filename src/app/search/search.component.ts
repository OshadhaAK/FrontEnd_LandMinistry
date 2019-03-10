import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CanActivate , Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProjectData } from '../project-data';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  userID: any;
  projectName: string = null;
  division: string = null;
  lotID: any = null;
  landUser: any = null;
  state: any = null;
  searchResults: ProjectData[] = [];
  constructor(private dataService: DataService, private router: Router, private flashMessageService: FlashMessagesService) {
    this.userID = sessionStorage.getItem('email');
  }

  ngOnInit() {
  }
  logout() {
    sessionStorage.clear();
    console.log('erase session', sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
  search() {
    this.dataService.search(this.projectName, this.division, this.landUser, this.lotID, this.state).subscribe(s => {
      // todo: show the search results
      if (s.success) {
        for (const element of s.msg) {
          const project = {
            division: element.division,
            landUser: element.landUser,
            lotId: element.lotId,
            mainProjectName: element.mainProjectName,
            projectId: element.projectId,
            projectName: element.projectName,
            state: element.state
          };
          this.searchResults.push(project);
        }
        this.dataService.saveSearchResults(this.searchResults);
        this.router.navigate(['/searchresult']);
      } else {
        this.flashMessageService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 1000});
        this.router.navigate(['/search']);
      }
    });

  }
}
