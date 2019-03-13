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

import { SearchResultComponent } from './search-result/search-result.component';
import { RouteGuardGuard } from "./route-guard.guard";
import { AdminGuard } from "./admin.guard";
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
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
    component: SearchComponent,
    canActivate : [RouteGuardGuard]
  },
  {
    /* todo make sure only admins can goto admin*/ 
    path: 'admin',
    component: AdminComponent,
    canActivate : [AdminGuard,RouteGuardGuard]
  },
  {
    path: 'createproject',
    component: CreateProjectComponent,
    canActivate : [RouteGuardGuard]
  },
  {
    path: 'createMainProject',
    component: CreateMainProjectComponent,
    canActivate : [RouteGuardGuard]
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },{
    path: 'resetpassword',
    component: ResetpasswordComponent
  },{
    path: 'changepassword',
    component: ChangepasswordComponent,
    canActivate : [RouteGuardGuard]
  },{
    path: 'searchresult',
    component: SearchResultComponent,
    canActivate : [RouteGuardGuard]
  },{
    path: 'projectdetails/:id',
    component: ProjectDetailComponent,
    canActivate : [RouteGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
