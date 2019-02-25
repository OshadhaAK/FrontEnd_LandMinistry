import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  color = 'primary';
  checked = false;
  disabled = false;
  detailSet: any;
  userID : any;
  constructor() {
    this.userID = "Oshadha";
    this.detailSet = [
    {name:"oshadha",email:"asdav@adv",password:"e32e",telno:54656},
    {name:"Kalana",email:"dfed@ree",password:"54tr",telno:546436},
    {name:"Heshan",email:"vcvf@riue",password:"b67r",telno:5576}
  ];
    
   }
  
  ngOnInit() {
  }

}
