import {AbstractControl, ValidatorFn} from "@angular/forms";

export class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if(control == null ||checkControl == null) {
        return {match: true}
      }
      if (control.value !== checkControl.value) {
        return { match: true };
      } else {
        return null;
      }
    }
  }
}
