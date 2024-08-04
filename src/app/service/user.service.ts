import {Injectable} from '@angular/core';
import {AuthserviceService} from "./authservice.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";
import {environment} from "../enviroment";
import {SignInRequest} from "../model/request/sign-in-request";
import {SignInResponse} from "../model/response/sign-in-response";
import {ProfilDto} from "../model/dto/user/profil-dto";

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

  postSignInRequest(request: SignInRequest) {
    return this.http.post<SignInResponse>(`${this.baseUrl}/api/v1/user/signin`, request)
  }

  putLogout() {
    return this.http.put(`${this.baseUrl}/api/v1/user/logout`, null);
  }

  getLoadUserData(accountId: string) {
    let params: HttpParams = new HttpParams();
    params = params.set("accountId", accountId);
    return this.http.get<ProfilDto>(`${this.baseUrl}/api/v1/user/profile`, {params})
  }

  putUpdatePublicTransparency(value: boolean, accountId: string) {
    let params: HttpParams = new HttpParams();
    params = params.set("accountId", accountId);
    params = params.set("transparency", value);
    return this.http.put(`${this.baseUrl}/api/v1/user/transparency`, {}, {params});
  }
}
