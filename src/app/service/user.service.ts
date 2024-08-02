import {Injectable} from '@angular/core';
import {AuthserviceService} from "./authservice.service";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";
import {environment} from "../enviroment";
import {SignInRequest} from "../model/request/sign-in-request";
import {SignInResponse} from "../model/response/sign-in-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthserviceService) {
  }

  postLoginRequest(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/v1/user/login`, request);
  }

  postSignInRequest2(request:SignInRequest) {
    return this.http.post<SignInResponse>(`${this.baseUrl}/api/v1/user/signin`,request)
  }

  putLogout() {
    return this.http.put(`${this.baseUrl}/api/v1/user/logout`, null);
  }
}
