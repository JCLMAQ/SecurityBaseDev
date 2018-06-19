import { Component, OnInit } from '@angular/core';
import { WakandaService } from './shared/wakanda.service';
import {AuthenticationService} from './shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private currentUser: any = {};

  constructor(
    public wakandaService: WakandaService,
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.authenticationService.getCurrentUser().then(user => {
      this.currentUser = user;
    }).catch((errorMessage) => {
      console.log(errorMessage);
    });
  }
  async logout() {
    await this.authenticationService.logout();
 // this.router.navigate(['/login']);
    this.router.navigate(['']);
  }
}
