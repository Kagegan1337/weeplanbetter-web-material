import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {delay, of, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private authKey: string = 'Bearer Token'

  private authenticated: Boolean = false;
  private timeout?: number;
  private authToken: string = "";
  private tokenSubscription = new Subscription()

  constructor(private jwtHelper: JwtHelperService, private router:Router) {
    this.authenticated = !!sessionStorage.getItem(this.authKey);
    // this.authenticated = !!localStorage.getItem(this.authKey);
  }

  login(token: string) {
    this.storeUserData(token);

  }

  storeUserData(token:string) {
    let exp = this.jwtHelper.getTokenExpirationDate(token);
    if(exp !== null) {
      this.timeout = exp.valueOf() - new Date().valueOf();
      sessionStorage.setItem(this.authKey, token);
      this.authenticated = true;
      this.authToken = token;
      this.expirationCounter(this.timeout);
    }

  }

  expirationCounter(timeout: number) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      this.logout();
      this.router.navigate(["/login"]);
    });
  }

  logout() {
    this.authenticated = false;
    this.tokenSubscription.unsubscribe();
    this.authKey = "";
    sessionStorage.clear();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getUsertoken() {
    let token = sessionStorage.getItem(this.authKey);
    if(token === null) {
      return ""
    } else {
      return token!;
    }
  }

  getUserIdFromToken() {
    let id = this.jwtHelper.decodeToken(this.getUsername());
    return id.valueOf("accountId")
  }

  getUsername() {
    let decoded = this.jwtHelper.decodeToken(this.getUsertoken());
    return decoded.sub;
  }
}
