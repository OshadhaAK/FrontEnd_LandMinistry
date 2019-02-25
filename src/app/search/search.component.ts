import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
  
})
export class SearchComponent implements OnInit {
  

  userID : any;
  constructor(private dataService:DataService) { 
    this.userID = "Oshadha";
    
  }
  
  ngOnInit() {
  }

}
