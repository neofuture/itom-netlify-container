import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from "@angular/router";
import {UserService} from "../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.userService.checkToken()) {
      return true;
    } else {
      this.router.navigate(['/login']).then();
      return false;
    }
  }

}
