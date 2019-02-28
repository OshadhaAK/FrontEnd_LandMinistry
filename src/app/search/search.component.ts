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
  projectName:string;
  division:string;
  lotID:any;
  landUser:any;
  state:any;
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
  search(){
    if (this.projectName === '' || this.projectName === null || this.division === '' || this.division == null  || this.lotID === '' || this.lotID == null || this.landUser === '' || this.landUser == null) {
      alert('please enter project details');
      this.router.navigate(['/search']);
    }
    else{
      this.dataService.search(this.projectName,this.division,this.landUser,this.lotID,this.state).subscribe((data:any)=>{
        console.log("datials",this.projectName,this.division,this.lotID,this.landUser,this.state)
        console.log("Search successfully!",data)
        if(data.success){
          this.router.navigate(['/projectdetails']);
        }
        else{
          alert('Wrong project details!');
          this.router.navigate(['/search']);
        }
      },(error: any) => {
        alert('Wrong project details!');
        this.router.navigate(['/search']);
    });
    }
  }
}
