import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {DataService} from "../service/data.service";

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private dataService: DataService,
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
