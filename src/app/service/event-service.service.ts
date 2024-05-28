import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EventDto, EventOverviewDto} from "../model/dto/event/event-dto";
import {environment} from "../enviroment";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getEventsForUser(userId: string) {
    let params = new HttpParams();
    params = params.set("userId", userId);
    return this.http.get<EventOverviewDto[]>(`${this.baseUrl}/events/all`, {params})
  }

  public getEventDetails(eventId: string, userId: string) {
    let params = new HttpParams();
    params = params.set("eventId", eventId);
    params = params.set("userId", userId);
    return this.http.get<EventOverviewDto[]>(`${this.baseUrl}/events/detail`, {params})
  }
}
