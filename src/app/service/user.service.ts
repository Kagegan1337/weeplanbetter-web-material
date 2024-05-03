import { Injectable } from '@angular/core';
import {AuthserviceService} from "./authservice.service";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  postLoginRequest(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`,request);
  }
}
