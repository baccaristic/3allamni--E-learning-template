import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthService  implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(state.url == "/login"){
      if (localStorage.getItem("isTeacher") == "true" ){
        return this.router.parseUrl("/addCourse");
      }
      else if(localStorage.getItem("id")){
        return this.router.parseUrl("/users/profile?id="+localStorage.getItem("id"));
      }
      else{
        return true;
      }
     
    }
    if (localStorage.getItem("isTeacher") == "true"){
      return true;
    }
    else{
      return this.router.parseUrl("/addCourse");
    }
  }
}
