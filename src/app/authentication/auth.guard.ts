import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {UserService} from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dataService: UserService,
              private router: Router) {
  }
  canActivate() {
    if(this.dataService.isUserLoginCridentialCorrect){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
