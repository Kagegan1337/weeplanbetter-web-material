import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EventOverviewEntry} from "../model/dto/event/event-overview-entry";
import {environment} from "../enviroment";
import {EventCreationDto} from "../model/dto/event/event-creation-dto";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getEventsForUser(userId:string) {
    let params = new HttpParams();
    params = params.set("userId", userId);
    return this.http.get<EventOverviewEntry[]>(`${this.baseUrl}/events/all`, {params});
  }

  public postNewEvent(eventCreationDto: EventCreationDto, accountId: string) {
    let params = new HttpParams();
    params = params.set("accountId",accountId);
    return this.http.post<string>(`${this.baseUrl}/events/create`,eventCreationDto,{params});
  }
}
