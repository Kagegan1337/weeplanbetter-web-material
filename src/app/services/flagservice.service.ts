import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { countries } from 'country-flag-icons';

@Injectable({
  providedIn: 'root'
})
export class FlagserviceService {

  constructor(private http: HttpClient) { }

  findFlag(name: String) {
    return this.http.get(`https://upload.wikimedia.org/wikipedia/commons/${name}`);
  }
}
