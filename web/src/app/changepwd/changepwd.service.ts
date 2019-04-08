import { Injectable } from '@angular/core';

import { WakandaService } from '../shared/wakanda.service';


@Injectable()
export class ChangePwdService {

  constructor(private wakandaService: WakandaService) {}

  async checkCredentials() {
    await this.wakandaService.checkCredentials();
  }

  async changePassword(pwdChange): Promise<any> {
    return new Promise((resolve, reject) => {
      this.wakandaService.catalog.then(ds => {
         ds.User.modifyPassword(pwdChange).then(res => {
           resolve(res);
         }).catch((error) => {
           reject(error.message);
         });
       });

     });
  }
}
