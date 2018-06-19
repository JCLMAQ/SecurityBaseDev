import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';


// Add the icon to the library so you can use it in your page
// fontawesome.library.add(solid.faUser);

export interface ICurrentUser {
  email: string;
  fullName: string;
  ID: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;

  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit() {
   
   this.currentUser = this.authenticationService.checkCredentials();
  }

}
