import { AuthService } from 'src/app/shared/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthonGuard implements CanActivate {
  constructor(private router:Router,private auth:AuthService){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if(this.auth.isLogin2){
    if(localStorage.getItem('isLogin')== 'true'){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
}
