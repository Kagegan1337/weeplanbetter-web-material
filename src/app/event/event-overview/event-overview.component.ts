import {Component, inject} from '@angular/core';
import {AuthserviceService} from "../../service/authservice.service";
import {EventOverviewDto} from "../../model/dto/event/event-dto";
import {EventServiceService} from "../../service/event-service.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {EmptyComponent} from "../../components/empty/empty.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Dialog} from "@angular/cdk/dialog";
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS, MatDialog,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {FestivalComponent} from "../new-event/festival/festival.component";
import {RoadtripComponent} from "../new-event/roadtrip/roadtrip.component";
import {CampingComponent} from "../new-event/camping/camping.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-event-overview',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    EmptyComponent,
    MatButton,
  ],
  templateUrl: './event-overview.component.html',
  styleUrl: './event-overview.component.scss'
})
export class EventOverviewComponent {

  private userId: string = this.authservice.getUserIdFromToken();
  readonly dialog = inject(MatDialog)
  protected events: EventOverviewDto[] = [];

  protected showLoading: boolean = false;

  constructor(private authservice: AuthserviceService,
              private eventService: EventServiceService) {
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

  openEventCreationDialog() {
    const dialogRef = this.dialog.open(EventCreationDialog, {
      width: '70%',
      height: '70%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('pizza')
    })
  }

  closeEventCreationDialog() {

  }
}

@Component({
  selector: 'event-creation-dialog',
  templateUrl: 'event-creation-dialog.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    FestivalComponent,
    RoadtripComponent,
    CampingComponent,
    NgIf,
    MatIconButton,
    MatButton,
    MatIcon,
  ],
  providers: [
    {
      provide:MatDialogRef,
      useValue:{}
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
  ],
})

export class EventCreationDialog {

  protected eventTypes : string[] = ['Festival','Camping', 'Raodtrip', 'Gruppen-Event']

  readonly dialogRef = inject(MatDialogRef<EventCreationDialog>);
  eventType: string = "";
  showPlanner: boolean = false;

  next($event: MouseEvent) {
    console.log(this.eventType)
    this.showPlanner = true;
  }

  backToBeginn() {
    this.showPlanner = false;
    this.eventType = "";
  }
}
