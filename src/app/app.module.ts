import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule} from '@angular/material';
import 'hammerjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { DataService } from './data.service';
import { LoginServiceService } from "../services/login-service.service";
import { AdminComponent } from './admin/admin.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    AdminComponent,
    CreateProjectComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ChangepasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [DataService,LoginServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
