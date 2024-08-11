import {Component, OnInit} from '@angular/core';
import {EventServiceService} from "../../../service/event-service.service";
import {AuthserviceService} from "../../../service/authservice.service";
import {EventOverviewEntry} from "../../../model/dto/event/event-overview-entry";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {LoginFailureDialogComponent} from "../../../dialogs/login-failure-dialog/login-failure-dialog.component";
import {EventCreationDialogComponent} from "../../../dialogs/event-creation-dialog/event-creation-dialog.component";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-event-overview',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    DatePipe,

  ],
  templateUrl: './event-overview.component.html',
  styleUrl: './event-overview.component.scss'
})
export class EventOverviewComponent implements OnInit{

  protected events: EventOverviewEntry[] = [];

  constructor(private eventService: EventServiceService,
              private authService: AuthserviceService,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.eventService.getEventsForUser(this.authService.getUserIdFromToken()).subscribe({
      next: value => {
        this.events = value;
      }
    })
  }

  getImageForEvent(event: EventOverviewEntry) {
    return this.sanitizer.bypassSecurityTrustHtml(event.image.url);
  }

  getNameForEvent(event: EventOverviewEntry) {
    return event.name;
  }

  getStartForEvent(event: EventOverviewEntry) {
    return event.start;
  }

  getEndForEvent(event: EventOverviewEntry) {
    return event.end;
  }

  getAddressForEvent(event: EventOverviewEntry) {
    return event.address;
  }

  openDialog() {
    this.dialog.open(EventCreationDialogComponent)
    this.dialog.afterAllClosed.subscribe({
      next: value => {
        this.load();
      }
    })
  }
}
