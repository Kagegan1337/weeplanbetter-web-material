import { Component } from '@angular/core';
import {AuthserviceService} from "../../service/authservice.service";
import {EventOverviewDto} from "../../model/dto/event/event-dto";
import {EventServiceService} from "../../service/event-service.service";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-event-overview',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './event-overview.component.html',
  styleUrl: './event-overview.component.scss'
})
export class EventOverviewComponent {

  private userId: string = this.authservice.getUserIdFromToken();
  protected events: EventOverviewDto[] = [];

  protected showLoading: boolean = false;

  constructor(private authservice: AuthserviceService, private eventService: EventServiceService) {
  }

  ngOnInit() {
    this.showLoading = true;
    this.eventService.getEventsForUser(this.userId).subscribe({
      next: value => {
        this.events = value;
        this.showLoading = false;
      },
      error: error => {
        console.error(error);
        this.showLoading = false;
      }
    })
  }


}
