import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

// prevent non connected users to access the app
@Injectable()
export class GuardService implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.authenticationService.checkCredentials().then(result => {
      if(result) {
        if(state.url === '/login' || state.url === '/register') {
          this.router.navigate(['/mainView']);
        } else {
          return true;
        }
      } else {
        this.router.navigate(['/login']);
      }
    }).catch((errorMessage) => {
      let url = state.url;
      if(url === '/login') {
        return true;
      } else if(url === '/register') {
        return true;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
