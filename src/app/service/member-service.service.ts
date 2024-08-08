import { Injectable } from '@angular/core';
import {UserSearchDto} from "../model/user/user-search-dto";
import { HttpClient } from "@angular/common/http";
import {AuthserviceService} from "./authservice.service";
import {environment} from "../enviroment";

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthserviceService) { }


  searchPerson(event: string) {
    return this.http.get<UserSearchDto[]>(`${this.baseUrl}/member/${this.authService.getUsername()}/search/${event}`)
  }
}
