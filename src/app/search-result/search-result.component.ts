import { Component, OnInit } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  projects : any;
  dataSource : any;
  constructor(private router : Router,private dataService :DataService,private flashMessageServie: FlashMessagesService) { }

  ngOnInit() {
    console.log("ran");
    this.dataService.search("","","","","").subscribe((result)=>{
      console.log("searching");
      if(result.success==true){
        this.projects = result.msg;
        console.log("!",this.projects);
        this.dataSource = new MatTableDataSource(this.projects);
        console.log("test",this.dataSource);
      }
      else{
        this.flashMessageServie.show('Error in finding the projects', {cssClass: 'alert-danger', timeout: 3000})
      }
    })
    
  }
  logout(){
    sessionStorage.clear();
    console.log("erase session",sessionStorage.getItem('email'));
    this.router.navigate(['/login']);
  }

  openProject(event : any){
    var projectId=event.target.value;
    console.log(projectId);
    /*Open the project page by using project ID*/
  }


}
