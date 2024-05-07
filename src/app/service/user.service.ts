import {Injectable} from '@angular/core';
import {AuthserviceService} from "./authservice.service";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";
import {SignUpRequest} from "../model/sign-in-request";
import {SignUpResponse} from "../model/sign-up-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  postLoginRequest(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`, request);
  }

  postSignInRequest(request: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${this.baseUrl}/user/signup`, request);
  }

  postLogout() {
    return this.http.post(`${this.baseUrl}/user/logout`, null);
  }
}
