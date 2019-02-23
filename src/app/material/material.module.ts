import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatOptionModule,
    Material.MatSelectModule,
    Material.MatTabsModule,
    Material.MatCardModule,
    Material.MatSlideToggleModule,
    Material.MatDividerModule
  ],
  exports : [
    Material.MatToolbarModule,
    Material.MatOptionModule,
    Material.MatSelectModule,
    Material.MatTabsModule,
    Material.MatCardModule,
    Material.MatSlideToggleModule,
    Material.MatDividerModule
  ],
  
})
export class MaterialModule { }
