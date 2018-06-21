import { Injectable } from '@angular/core';
import { WakandaClient } from 'wakanda-client/browser/no-promise';

const client = new WakandaClient({});

export interface ICurrentUser {
  email: string;
  fullName: string;
  ID: string;
}

@Injectable()
export class WakandaService {
  private ds: Promise<any>;
  private currentUser: Promise<ICurrentUser>;

  constructor() {  }

  get catalog(): Promise<any> {
    if (!this.ds) {
      this.ds = client.getCatalog();
    }
    return this.ds;
  }

  get directory() {
    return client.directory;
  }

  // get user(): Promise<ICurrentUser> {
  //   if (!this.currentUser) {
  //     this.refreshUser();
  //   }

  //   return this.currentUser;
  // }

  get user(): Promise<ICurrentUser> {
    if (!this.currentUser) {
      this.refreshUser();
    }

    return this.currentUser;
  }

  refreshUser() {
    this.currentUser = client.directory
      .getCurrentUser()
      .catch(() => { });
  }

  async login(username: string, password: string): Promise<boolean> {
    let isOK = false;
    try {
      isOK = await client.directory.login(username, password);
    } catch (e) {
      isOK = false;
    }
    if (isOK) {
      this.refreshUser();
    }
    return isOK;
  }

  async logout(): Promise<boolean> {
    let isOK = false;
    try {
      isOK = await client.directory.logout();
    } catch (e) {
      isOK = false;
    }
    if (isOK) {
      this.refreshUser();
    }
    return isOK;
  }

  checkCredentials() {
    return new Promise((resolve, reject) => {
      client.directory.getCurrentUser().then((user) => {
        this.currentUser = user;
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      });
    });
  }

}
