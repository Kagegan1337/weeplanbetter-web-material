import { Component } from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
import { MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {KeyValuePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {CampingComponent} from "../new-event/camping/camping.component";
import {FestivalComponent} from "../new-event/festival/festival.component";
import {RoadtripComponent} from "../new-event/roadtrip/roadtrip.component";
import {MatDialogContent} from "@angular/material/dialog";

@Component({
  selector: 'app-event-creation',
  standalone: true,
  imports: [
    MatStepperModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioGroup,
    MatRadioButton,
    CampingComponent,
    FestivalComponent,
    RoadtripComponent,
    KeyValuePipe,
    MatDialogContent,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './event-creation.component.html',
  styleUrl: './event-creation.component.scss'
})
export class EventCreationComponent {
  types : EventType[] = [EventType.Camping, EventType.Festival, EventType.Roadtrip]
  protected readonly EventType= EventType;
  type: EventType = EventType.None;

  metaform = this.formGroupBuiler.group(
    {
      name:['', Validators.required],
      from:['', Validators.required],
      to: ['', Validators.required],
      description: [''],
    }
  );

  constructor(private formGroupBuiler: FormBuilder) {
  }
}



export enum EventType{
  Festival = "Festival",
  Camping = "Camping",
  Roadtrip = "Roadtrip",
  None = "None",
}
