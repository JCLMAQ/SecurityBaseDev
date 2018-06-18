import { Component } from '@angular/core';
import { WakandaService } from './shared/wakanda.service';
import {AuthenticationService} from './shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public wakanda: WakandaService,
    public authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  async logout() {
    await this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
