import {Component, Input, OnInit} from '@angular/core';
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatAutocomplete, MatAutocompleteModule} from "@angular/material/autocomplete";
import {UserSearchDto} from "../../../model/user/user-search-dto";
import {UserService} from "../../../service/user.service";
import {MemberServiceService} from "../../../service/member-service.service";
import {catchError, debounceTime, distinctUntilChanged, filter, map, Observable, of, startWith, switchMap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {AddFriendsComponent} from "../../add-friends/add-friends.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {EventCreationDto} from "../../../model/dto/event-creation-dto";
import {EventServiceService} from "../../../service/event-service.service";

@Component({
  selector: 'app-camping',
  standalone: true,
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatButtonModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatAutocompleteModule,
    AsyncPipe,
    AddFriendsComponent,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './camping.component.html',
  styleUrl: './camping.component.scss'
})
export class CampingComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private memberSerivce: MemberServiceService, private eventService: EventServiceService) {
  }

  @Input()
  public metaData: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    from: [new Date, Validators.required],
    to: [new Date, Validators.required]
  });

  adresse: FormGroup = this.formBuilder.group({
    street: ['', Validators.required],
    number: ['', Validators.required],
    zip: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required]
  });

  friends: FormGroup = this.formBuilder.group({});

  contributors: UserSearchDto[] = [];

  myControl: FormControl = new FormControl();
  filterdOptions: Observable<UserSearchDto[]> = new Observable<UserSearchDto[]>();


  ngOnInit() {
    this.filterdOptions = this.myControl.valueChanges.pipe(
      filter(value => value && value.length > 2),
      switchMap(value => this.search(value)),
      catchError(() => of([]))
    )
  }

  private search(value: string) {
    console.log(value);
    return this.memberSerivce.searchPerson(value);
  }

  displayFn(user?: UserSearchDto): string {
    return user ? user.name : '';
  }

  addUser(event: UserSearchDto) {
    this.contributors.push(event);
  }

  removeUser(user: UserSearchDto) {
    this.contributors.splice(this.contributors.indexOf(user), 1);
  }

  getName() {
    return this.metaData.controls['name'].value;
  }

  getStart() {
    return this.metaData.controls['from'].value;
  }

  getEnde() {
    return this.metaData.controls['to'].value;
  }

  getStreet() {
    return this.adresse.controls['street'].value;
  }

  getNumber() {
    return this.adresse.controls['number'].value;
  }

  getZip() {
    return this.adresse.controls['zip'].value;
  }

  getOrt() {
    return this.adresse.controls['city'].value;
  }

  getCountry() {
    return this.adresse.controls['country'].value;
  }

  getFriends() {
    return this.contributors;
  }

  save() {
    let contributors: string[] = [];
    this.contributors.forEach(c => contributors.push(c.id));
    const eventCreationDto: EventCreationDto = {
      type: 'Camping',
      name: this.getName(),
      von: new Date(this.getStart()).toISOString(),
      bis: new Date(this.getEnde()).toISOString(),
      contributors: contributors,
      address : {
        street: this.getStreet(),
        number: this.getNumber(),
        zip: this.getZip(),
        city: this.getOrt(),
        country: this.getCountry(),
        addition:''
      }
    }
    this.eventService.saveEvent(eventCreationDto)
  }
}
