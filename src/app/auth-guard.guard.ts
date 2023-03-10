import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router"
import { UsersService } from "./services/users.service";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from "sweetalert2";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(private router: Router, private authService:UsersService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if(this.authService.isAuthenticated()){
      return true
    }
    else{
      this.router.navigateByUrl('account/login')
      Swal.fire({
        icon: 'error',
        title: 'No esta logueado',
        text: 'Necesita loguearse para acceder a los productos'
      })
      return false
    }

    
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.loggedIn
  }

}