import {Component} from '@angular/core';
import {SignUpRequest} from "../../../model/sign-in-request";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {Gender} from "../../../model/type/gender";
import {UserService} from "../../../service/user.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FlexLayoutModule} from "@angular/flex-layout";
import {Country, getCode, getNames} from 'country-list';
import {FlagserviceService} from "../../../services/flagservice.service";
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {ReplaySubject} from "rxjs";
import {MatDatepickerModule, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDivider, MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    NgIf,
    NgForOf,
    KeyValuePipe,
    NgClass,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    AsyncPipe,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatDividerModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  regex = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;

  userDataForm = new FormGroup({
    person: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      title: new FormControl(''),
      gender: new FormControl('', Validators.required),
      birth: new FormControl(new Date, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telPrivate: new FormControl('', [Validators.required, Validators.pattern("(?:(?:\\(?(?:00|\\+)([1-4]\\d\\d|[1-9]\\d?)\\)?)?[\\-\\.\\ \\\\\\/]?)?((?:\\(?\\d{1,}\\)?[\\-\\.\\ \\\\\\/]?){0,})(?:[\\-\\.\\ \\\\\\/]?(?:#|ext\\.?|extension|x)[\\-\\.\\ \\\\\\/]?(\\d+))?")]),
      telBusiness: new FormControl(''),
      privateAddress: new FormGroup({
        country: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        addition: new FormControl(''),
        number: new FormControl('', Validators.required),
      }),
    })
  });

  private passwordMatchValidator2: ValidatorFn | ValidatorFn[] | null = (control) => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordControl');
    console.log(`Password: ${password?.value} - PasswordConfirm: ${passwordConfirm?.value}`)
    // check if the values of the password and passwordConfirm fields are the same
    if (password && passwordConfirm && password.value !== passwordConfirm.value) {
      console.log("error")
      // if they're not, return an error object
      return {passwordMismatch: true};
    }
    return null;
  };

  userAccountForm = new FormGroup({
    accountDto: new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')]),
      passwordControl: new FormControl('', [Validators.required, () =>this.passwordMatchValidator2]),
      isBusiness: new FormControl(false)
    })
  });



  protected countries = getNames();
  protected selectedCountry = '';
  protected countryList: country[] = [];
  protected readonly Gender = Gender;
  searchCountryControl: FormControl = new FormControl;
  filtedCountryList: ReplaySubject<Country[]> = new ReplaySubject<Country[]>();
  protected showAccountPanel: boolean = false;

  constructor(private userService: UserService, private breakpointObserver: BreakpointObserver, private flagService: FlagserviceService) {
    this.countries.forEach(c => {
      this.countryList.push({name: c, code: getCode(c)!})
    })
    this.filtedCountryList.next(this.countryList.slice())
    this.searchCountryControl.valueChanges.subscribe(() => {
      this.filterCountries()
    })
  }

  protected signUp() {
    if (this.userDataForm.invalid) {
      alert('Form is invalid');
      return;
    }

    const formValue = this.userDataForm.value;
    const accountFormValue = this.userAccountForm.value;
    if (formValue.person !== undefined && accountFormValue.accountDto !== undefined && formValue.person.privateAddress !== undefined) {
      const signUpRequest: SignUpRequest = {
        person: {
          firstName: formValue.person.firstName!,
          lastName: formValue.person.lastName!,
          title: formValue.person.title!,
          gender: formValue.person.gender!,
          birth: formValue.person.birth!,
          email: formValue.person.email!,
          telPrivate: formValue.person.telPrivate!,
          telBusiness: formValue.person.telPrivate!,
          privateAddress: {
            country: formValue.person.privateAddress.country!,
            zipcode: formValue.person.privateAddress.zipcode!,
            city: formValue.person.privateAddress.city!,
            street: formValue.person.privateAddress.street!,
            addition: formValue.person.privateAddress.addition!,
            number: formValue.person.privateAddress.number!
          },
          invoiceAddress: {
            country: formValue.person.privateAddress.country!,
            zipcode: formValue.person.privateAddress.zipcode!,
            city: formValue.person.privateAddress.city!,
            street: formValue.person.privateAddress.street!,
            addition: formValue.person.privateAddress.addition!,
            number: formValue.person.privateAddress.number!
          }
        },
        accountDto: {
          userName: accountFormValue.accountDto.userName!,
          password: accountFormValue.accountDto.password!,
          isBusiness: accountFormValue.accountDto.isBusiness!
        }
      };
      console.log(signUpRequest);
      this.userService.postSignInRequest(signUpRequest)
        .subscribe({
          next: value => {
            console.log(value);
          },
          error: err => {
            console.error(err);
          }
        });
    } else {
      alert('Form is invalid');
    }


  }

  getEmailFormControl() {
    return this.userDataForm.controls.person.get('email');
  }

  getPhoneFormControl() {
    return this.userDataForm.controls.person.get('telPrivate');
  }

  getStreetFormControl() {
    return this.userDataForm.controls.person.controls.privateAddress.get('street');
  }

  private filterCountries() {
    let search = this.searchCountryControl.value;
    if (search) {
      search = search.toLowerCase();
    } else {
      this.filtedCountryList.next(this.countryList.slice())
      return;
    }
    this.filtedCountryList.next(this.countryList.filter(country => country.name.toLowerCase().includes(search)));
  }

  forwardSignUp() {
    this.showAccountPanel = true;
  }

  backToSignUp() {
    this.showAccountPanel = false;
  }


}

export function PhoneValidator(control: FormControl) {
  // Telefonnummernmuster
  // Passt zu den meisten internationalen Formaten, nicht perfekt aber gut als Anfang
  const regex = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;

  if (control.value && !regex.test(control.value)) {
    return {'Invalid Phone Number': true};
  }
  return false;
}

export interface country {
  name: string;
  code: string;
}
