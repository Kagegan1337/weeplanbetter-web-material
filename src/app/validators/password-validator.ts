import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export class PasswordValidator {

  static validPassword(control: AbstractControl): ValidationErrors | null {
    return (control: FormGroup): ValidationErrors | null => {
      const value = control.value;

      let error = {};
      if (!value) {
        return null;
      }

      // Mindestens 8 Zeichen
      if (value.length < 8) {
        error = { ...error, length: 'Password must be at least 8 characters long.' };
      }

      // Mindestens 1 Großbuchstabe
      if (!(/[A-Z]/.test(value))) {
        error = { ...error, uppercase: 'Password must contain at least 1 uppercase letter.' };
      }

      // Mindestens 1 Kleinbuchstabe
      if (!(/[a-z]/.test(value))) {
        error = { ...error, lowercase: 'Password must contain at least 1 lowercase letter.' };
      }

      // Nicht mehr als 3 aufeinander folgende Zeichen dürfen gleich sein
      if (/([a-zA-Z0-9!@#$%^&*()]){4,}/.test(value)) {
        error = { ...error, sequence: 'Password must not contain more than 3 consecutive identical characters.' };
      }

      // Mindestens 1 Sonderzeichen
      if (!(/[!@#$%^&*()]/.test(value))) {
        error = { ...error, specialCharacter: 'Password must contain at least 1 special character.' };
      }

      if (error) {
        console.log(error)
        control.setErrors(error);
      }

      return {invalidPassword: true};
    };
  }
}
