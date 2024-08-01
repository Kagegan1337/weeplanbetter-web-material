import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {catchError, filter, Observable, of, switchMap} from "rxjs";
import {UserSearchDto} from "../../model/user/user-search-dto";
import {MemberServiceService} from "../../service/member-service.service";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'app-add-friends',
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
    ],
  templateUrl: './add-friends.component.html',
  styleUrl: './add-friends.component.scss'
})
export class AddFriendsComponent implements OnInit{

  myControl: FormControl = new FormControl();
  filterdOptions: Observable<UserSearchDto[]> = new Observable<UserSearchDto[]>();

  @Output()
  selectionEmitter = new EventEmitter<UserSearchDto>();


  constructor(private memberService: MemberServiceService) {
  }

  ngOnInit() {
    this.filterdOptions = this.myControl.valueChanges.pipe(
      filter(value => value && value.length > 2),
      switchMap(value => this.search(value)),
      catchError(()=>of([]))
    )
    this.myControl.valueChanges.subscribe({
      next: value => {
        if(typeof value === 'object' && value !== null) {
          this.selectionEmitter.next(value);
        }
      }
    })
  }

  private search(value: string) {
    console.log(value);
    return this.memberService.searchPerson(value);
  }

  displayFn(user?: UserSearchDto): string {
    return user ? user.name : '';
  }
}
