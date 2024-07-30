import {Injectable} from '@angular/core';
import {AuthserviceService} from "./authservice.service";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";
import {SignUpRequest} from "../model/sign-in-request";
import {SignUpResponse} from "../model/sign-up-response";
import {environment} from "../enviroment";
import {UserSearchDto} from "../model/user/user-search-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthserviceService) {
  }

  postLoginRequest(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`, request);
  }

  postSignInRequest(request: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${this.baseUrl}/user/signup`, request);
  }

  putLogout() {
    return this.http.put(`${this.baseUrl}/user/logout`, null);
  }
}
