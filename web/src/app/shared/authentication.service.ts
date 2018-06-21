import { Injectable } from '@angular/core';

import { WakandaService } from './wakanda.service';
// import { WakandaClient } from 'wakanda-client/browser/no-promise';

// const client = new WakandaClient({});

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
  private current: Promise<ICurrentUser>;


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
  // async login(username: string, password: string): Promise<boolean> {
  //   let isOK = false;
  //   try {
  //     isOK = await client.directory.login(username, password);
  //   } catch (e) {
  //     isOK = false;
  //   }
  //   if (isOK) {
  //     this.refreshUser();
  //   }
  //   return isOK;
  // }

  // async logout(): Promise<boolean> {
  //   let isOK = false;
  //   try {
  //     isOK = await client.directory.logout();
  //   } catch (e) {
  //     isOK = false;
  //   }
  //   if (isOK) {
  //     this.refreshUser();
  //   }
  //   return isOK;
  // }

//  async user(): Promise<ICurrentUser> {
//    return this.wakandaService.user;
//   }

  // get user(): Promise<ICurrentUser> {
  //   if (!this.current) {
  //     this.refreshUser();
  //   }

  //   return this.current;
  // }

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
