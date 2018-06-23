import { Injectable } from '@angular/core';

import { WakandaService } from './wakanda.service';

export class User {
  constructor(
    public logon: string,
    public password: string) { }
}
export interface ICurrentUser {
  email: string;
  fullName: string;
  ID: string;
}

@Injectable()
export class AuthenticationService {
  private currentUser:  ICurrentUser;
 // private current: Promise<ICurrentUser>;


  constructor(private wakandaService: WakandaService) {}

async login (username: string, password: string) {
  let isOK = false;
  isOK = await this.wakandaService.login (username, password);
  if (isOK) {
        this.refreshUser();
      }
      return isOK;
}

async logout() {
  let isOK = false;
  isOK = await this.wakandaService.logout ();
  if (isOK) {
        this.refreshUser();
      }
      return isOK;
}

 /*  async current() {
    let user: ICurrentUser ;
      user = await this.wakandaService.user;

    return user;

  } */

  async refreshUser() {
    await this.wakandaService.refreshUser();
  }

  async checkCredentials() {
    await this.wakandaService.checkCredentials();
  }

  async userCurrent() {
    this.currentUser = await this.wakandaService.user;
  }

  // getCurrentUser() {
  //   return new Promise((resolve, reject) => {
  //     if (this.currentUser) {
  //       resolve(this.currentUser);
  //     } else {
  //       this.checkCredentials().then((user) => {
  //         resolve(user);
  //       }).catch((error) => {
  //         reject(error.message);
  //       });
  //     }
  //   });
  // }

}
