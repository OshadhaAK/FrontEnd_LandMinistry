import { Component, OnInit } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  projects: any;
  dataSource: any;
  constructor(private router: Router, private dataService: DataService, private flashMessageServie: FlashMessagesService) { }

  ngOnInit() {
    this.projects = this.dataService.getSearchResults();
    this.dataSource = new MatTableDataSource(this.projects);
  }
  logout() {
    sessionStorage.clear();
    console.log('erase session', sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }

  openProject(event: any) {
    const projectId = event.target.value;
    console.log(projectId);
    this.router.navigate(['/projectdetails', projectId]);
    /*Open the project page by using project ID*/
  }


}
