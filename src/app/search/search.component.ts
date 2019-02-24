import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
export interface Project {
  
  name: string;
  
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
  
})
export class SearchComponent implements OnInit {
  projectCtrl = new FormControl();
  filteredProjects: Observable<Project[]>;

  projects: Project[] = [
    {
      name: 'Southern Express',
      
    },
    {
      name: 'Nothern Express',
      
    },
    {
      name: 'Eastern Express',
      
    },
    {
      name: 'Western Express',
      
    }
  ];

  userID : any;
  constructor(private dataService:DataService) { 
    this.userID = "Oshadha";
    this.filteredProjects = this.projectCtrl.valueChanges
      .pipe(
        startWith(''),
        map(project => project ? this._filterProjects(project) : this.projects.slice())
      );
  }
  private _filterProjects(value: string): Project[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter(project => project.name.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnInit() {
  }

}
