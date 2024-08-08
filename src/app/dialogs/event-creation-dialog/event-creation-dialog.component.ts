import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {EventServiceService} from "../../service/event-service.service";
import {AuthserviceService} from "../../service/authservice.service";
import {EventCreationDto} from "../../model/dto/event/event-creation-dto";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-event-creation-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatDatepickerInput,
    MatButtonModule,

  ],
  templateUrl: './event-creation-dialog.component.html',
  styleUrl: './event-creation-dialog.component.scss'
})
export class EventCreationDialogComponent {

  constructor(private eventService: EventServiceService,
              private authService: AuthserviceService) {
  }

  fgEvent = new FormGroup({
    name: new FormControl('', Validators.required),
    von: new FormControl(''),
    bis: new FormControl('')
  })
  fgAddress = new FormGroup({
    country: new FormControl(''),
    zip: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    addition: new FormControl(''),
    number: new FormControl('')
  })

  getEventName() {
    return this.fgEvent.controls.name.value === null ? "" : this.fgEvent.controls.name.value;
  }

  getVon() {
    return this.fgEvent.controls.von.value === null ? new Date() : new Date(this.fgEvent.controls.von.value);
  }

  getBis() {
    return this.fgEvent.controls.bis.value === null ? new Date() : new Date(this.fgEvent.controls.bis.value);
  }

  getEventCountry() {
    return this.fgAddress.controls.country.value === null ? "NULL" : this.fgAddress.controls.country.value;
  }

  getEventZip() {
    return this.fgAddress.controls.zip.value === null ? "NULL" : this.fgAddress.controls.zip.value;
  }

  getEventCity() {
    return this.fgAddress.controls.city.value === null ? "NULL" : this.fgAddress.controls.city.value;
  }

  getEventStreet() {
    return this.fgAddress.controls.street.value === null ? "NULL" : this.fgAddress.controls.street.value;
  }

  getEventAddtion() {
    return this.fgAddress.controls.addition.value === null ? "NULL" : this.fgAddress.controls.addition.value;
  }

  getEventNumber() {
    return this.fgAddress.controls.number.value === null ? "NULL" : this.fgAddress.controls.number.value;
  }

  submit() {
    const eventCreationDto: EventCreationDto = {
      type: "Event",
      name: this.getEventName(),
      von: this.getVon(),
      bis: this.getBis(),
      contributors: [],
      address: {
        country: this.getEventCountry(),
        zip: this.getEventZip(),
        city: this.getEventCity(),
        street: this.getEventStreet(),
        addition: this.getEventAddtion(),
        number: this.getEventNumber()
      }
    };
    console.log(eventCreationDto);
    this.eventService.postNewEvent(eventCreationDto, this.authService.getUserIdFromToken()).subscribe({
      next: () => {
        console.log("EVENT SEND")
      }
    })
  }
}
