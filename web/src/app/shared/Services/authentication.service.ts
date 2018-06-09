import { Injectable } from '@angular/core';

import { WakandaService } from '../wakanda.service';


export class User {

  constructor(
    public logon: string,
    public password: string) { }
}

@Injectable()
export class AuthenticationService {
  private currentUser :any;

  constructor(private wakanda: WakandaService) {}

  logout() {
    return new Promise ((resolve, reject) => {
      this.wakanda.directory.logout().then(result => {
        resolve(result);
      }).catch((error) => {
        reject(error.message);
      });
    });
  }

  login(user) {
    return new Promise ((resolve, reject) => {
      this.wakanda.directory.login(user.logon, user.password, 60).then(result => {
        resolve(result);
      }).catch((error) => {
        reject(error.message);
      });
    });
  }

  checkCredentials() {
    return new Promise((resolve, reject) => {
      this.wakanda.directory.getCurrentUser().then((user) => {
        this.currentUser = user;
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      });
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      if(this.currentUser) {
        resolve(this.currentUser);
      } else {
        this.checkCredentials().then((user) => {
          resolve(user);
        }).catch((error) => {
          reject(error.message);
        });
      }
    });
  }

}
