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


  constructor(private wakandaService: WakandaService) {}

async login(username: string, password: string): Promise<boolean> {
  let isOK = false;
  try {
    isOK = await this.wakandaService.directory.login(username, password);
  } catch (e) {
    isOK = false;
  }
  if (isOK) {
    this.wakandaService.refreshUser();
  }
  return isOK;
}

async logout(): Promise<boolean> {
  let isOK = false;
  try {
    isOK = await this.wakandaService.directory.logout();
  } catch (e) {
    isOK = false;
  }
  if (isOK) {
    this.wakandaService.refreshUser();
  }
  return isOK;
}


  async current () {
    let user: ICurrentUser ;
      user = await this.wakandaService.user;
    return user;
  }

  async refreshUser() {
    await this.wakandaService.refreshUser();
  }

  async checkCredentials() {
    await this.wakandaService.checkCredentials();
  }

}
