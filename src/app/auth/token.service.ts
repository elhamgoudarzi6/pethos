import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}
  checkTokenExamination(responseData: any, userType: string) {
    if (responseData === 'Failed to authenticate token.') {
      if (userType === 'user') {
        this.localStorage.removeCurrentUser();
        this.router.navigateByUrl('[/user]');
      } else if (userType === 'admin') {
        this.localStorage.removeCurrentUser();
        this.router.navigateByUrl('[/admin]');
      }
    }
  }
}
