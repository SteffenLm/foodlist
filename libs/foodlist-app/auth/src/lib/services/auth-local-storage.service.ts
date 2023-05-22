import { Injectable } from '@angular/core';
import { LocalStorage } from '@foodlist/foodlist-app/storage';

@Injectable({ providedIn: 'root' })
export class AuthLocalStorageService extends LocalStorage<string> {
  public saveToken(token: string) {
    this.setData([token]);
  }

  public loadToken() {
    return this.getData()[0];
  }
}
