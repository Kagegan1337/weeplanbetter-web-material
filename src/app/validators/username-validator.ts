import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export class UsernameValidator {
  static validUsername(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-zA-Z0-9]{5,12}$/
    return regex.test(control.value) ? null : {usernameInvalid: true}
  }
}
