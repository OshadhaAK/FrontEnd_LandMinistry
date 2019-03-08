import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component'; 
import { CreateProjectComponent } from './create-project/create-project.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { CreateMainProjectComponent } from './create-main-project/create-main-project.component'

  import { from } from 'rxjs';
import { SearchResultComponent } from './search-result/search-result.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'createproject',
    component: CreateProjectComponent
  },
  {
    path: 'createMainProject',
    component: CreateMainProjectComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },{
    path: 'resetpassword',
    component: ResetpasswordComponent
  },{
    path: 'changepassword',
    component: ChangepasswordComponent
  },{
    path: 'searchresult',
    component: SearchResultComponent
  },{
    path: 'projectdetails',
    component: ProjectDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
