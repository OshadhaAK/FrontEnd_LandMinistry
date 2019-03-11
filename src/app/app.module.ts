import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatDialogModule} from '@angular/material';
import 'hammerjs';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { DataService } from './data.service';
import { MainProjectService } from './services/main-project.service';
import { LoginServiceService } from '../services/login-service.service';
import { FileService } from './services/file.service';
import { AdminComponent } from './admin/admin.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptor } from '../services/tokenInterceptor';

import { HttpClientModule } from '@angular/common/http';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { CreateMainProjectComponent } from './create-main-project/create-main-project.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RouteGuardGuard  } from './route-guard.guard';
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
    ProjectDetailComponent,
    CreateMainProjectComponent,
    SearchResultComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [DataService, FileService,
    LoginServiceService,
    MainProjectService,
    RouteGuardGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
