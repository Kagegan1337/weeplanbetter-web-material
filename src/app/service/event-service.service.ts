import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {EventDto, EventOverviewDto} from "../model/dto/event/event-dto";
import {environment} from "../enviroment";
import {EventCreationResponseDto} from "../model/dto/event-creation-response-dto";
import {EventCreationDto} from "../model/dto/event-creation-dto";
import {AuthserviceService} from "./authservice.service";

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthserviceService) {
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

  saveEvent(eventCreationDto: EventCreationDto) {
    let params = new HttpParams();
    params = params.set('accountId', this.authService.getUserIdFromToken())
    return this.http.put<EventCreationResponseDto>(`${this.baseUrl}/events/create`, eventCreationDto, {params})
  }
}
