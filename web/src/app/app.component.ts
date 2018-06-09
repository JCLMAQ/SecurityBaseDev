import { Component } from '@angular/core';
import { WakandaService } from './shared/wakanda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public wakanda: WakandaService,
    private router: Router
  ){

  }

  async logout(){
    await this.wakanda.logout();
    this.router.navigate(['/login']);
  }
}
