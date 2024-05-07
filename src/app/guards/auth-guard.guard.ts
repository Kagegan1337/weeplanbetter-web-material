import {CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthserviceService} from "../service/authservice.service";

@Injectable()
class UserToken {}

@Injectable({
  providedIn: 'root'
})
class PermissionService {
  constructor(private authService: AuthserviceService, private router: Router) {
  }

  canActivate() {
    console.log(`called ${this.authService.isAuthenticated()}`)
    let y = this.authService.isAuthenticated();
    if(y) {
      return true;
    } else  {
      this.router.navigate(['/home'])
      return false
    }
  }

  canMatch(currentUser: UserToken) {
    return this.authService.getUsertoken() as UserToken === currentUser;
  }

}

export const authGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
