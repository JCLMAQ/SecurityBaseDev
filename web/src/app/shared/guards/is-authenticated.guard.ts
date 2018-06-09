import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WakandaService } from '../wakanda.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private wakandaService: WakandaService,
    private router: Router
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let result: boolean = false;

    try {
      const user = await this.wakandaService.user;
      result = !!user;
    } catch (e) {
      result = false;
    }

    if(!result){
      this.router.navigate(['/login']);
    }

    return result;
  }
}
