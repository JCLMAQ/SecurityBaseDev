import { Component, OnInit } from '@angular/core';
import { WakandaService } from '../shared/wakanda.service';
import { ChangePwdService } from './changepwd.service';
import { Router } from '@angular/router';


export interface IChangepwd {
  oldPassword: string;
  newPassword: string;
  newPasswordAgain: string;
};

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {

  pwdChange: IChangepwd = {
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: ''
  };

  constructor(
    private wakandaService: WakandaService,
    private changePwdService: ChangePwdService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async changepwd(pwdChange) {
    // const isOK = await this.changePwdService.changePassword(pwdChange);
    // if (isOK) {
    //   this.router.navigate(['/']);
    // } else {
    //   alert('Changement de mot de passe impossible');
    // }
    try {
      const res = await this.changePwdService.changePassword(pwdChange);
      if(res && res.errorMessage){
        alert(res.errorMessage);
      }
    } catch (e) {
      alert('Désolé, une erreur a eu lieu empéchant le changement de mot de passe');
    }
    this.router.navigate(['/']);
  }

  backhome() {
    this.router.navigate(['']);
  }
}
