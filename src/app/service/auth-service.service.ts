import {Injectable} from '@angular/core';
import {Role, UserInfo} from "../models";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userInfo: UserInfo = {
    name: 'User test',
    roles: [Role.user]
  };

  constructor() {
  }

  hasRole(role: Role): boolean {
    if (!role) {
      return false;
    }
    if (!this.userInfo.roles) {
      return false;
    }
    return this.userInfo.roles?.findIndex(r => r == role) != 0
  }

  hasAnyRole(roles: Role[]): boolean {
    if (!roles) {
      return true;
    }
    if (!this.userInfo.roles) {
      return false;
    }
    let result = this.userInfo.roles?.filter(r => roles.findIndex(x => x === r) != -1);
    if (result && result.length > 0) {
      return true;
    }
    return false;
  }
}
