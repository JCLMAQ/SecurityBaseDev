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
  private current: Promise<ICurrentUser>;

  constructor() {  }

 get catalog(): Promise<any>{
    if(!this.ds) {
      this.ds = client.getCatalog();
    }
    return this.ds;
  }

  get directory() {
    return client.directory;
  }

  get user(): Promise<ICurrentUser> {
    if (!this.current) {
      this.refreshUser();
    }

    return this.current;
  }

  public refreshUser() {
    this.current = client.directory
      .getCurrentUser()
      .catch(() => { });
  }

  async login(username: string, password: string): Promise<boolean> {
    let isOK: boolean = false;
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
    let isOK: boolean = false;
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

}
