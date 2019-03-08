import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from "../services/login-service.service";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate, CanActivateChild, CanLoad {

  accessible : boolean = false;
  constructor (private loginService : LoginServiceService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.getAuthToken()){
        return true;
      }
      else{
        return false;
      }
      /*this.loginService.verifyUser(this.loginService.getAuthToken()).subscribe((data:any)=>{
        console.log(data.success);
        if(data.success==true){
          this.accessible= true;
        }
        else{
          return this.accessible= false;
        }
      });
      console.log(this.accessible);
      */
      return this.accessible;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    this.loginService.verifyUser(this.loginService.getAuthToken()).subscribe((data:any)=>{
      if(data.success==true){
        console.log("user verified in load");
        return true;
      }
    });
    return false;
  }
}
