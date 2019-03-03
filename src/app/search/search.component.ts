import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CanActivate , Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
  
})
export class SearchComponent implements OnInit {
  userID : any;
  projectName: string = null;
  division: string = null;
  lotID: any = null;
  landUser: any = null;
  state: any = null;
  constructor(private dataService:DataService, private router: Router) { 
    this.userID = sessionStorage.getItem('email');
    
  }
  
  ngOnInit() {
  }
  logout(){
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }
  search() {
    this.dataService.search(this.projectName, this.division, this.landUser, this.lotID, this.state).subscribe(s => {
      console.log(s);
      // todo: show the search results
    });

  }
}
