import {Component, InjectionToken, ViewChild} from '@angular/core';
import {BreakpointResolverService} from "../../../util/ui/breakpoint-resolver.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmailValidator} from "../../../validators/email-validator";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "../../../service/user.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {SuccessComponent} from "../../../dialogs/success/success.component";
import {PasswordValidator} from "../../../validators/password-validator";
import {Validation} from "../../../validators/validation";
import {UsernameValidator} from "../../../validators/username-validator";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatIconButton,
    MatButton,
    SuccessComponent,
    MatTooltipModule,

  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  constructor(private breakpointUtil: BreakpointResolverService,
              private userService: UserService,
              private router: Router) {
  }

  @ViewChild("ipUsername")
  private inputUsername!: HTMLElement;

  //variables
  protected isEnterPassword: boolean = true;
  protected isConfirmPassword: boolean = true;
  protected login: boolean = true;

  //forms
  fgSignIn = new FormGroup({
    username: new FormControl('', [Validators.required, UsernameValidator.validUsername]),
    password: new FormControl('', [Validators.required, PasswordValidator.validPassword]),
    confirmPassword: new FormControl('', [Validators.required, PasswordValidator.validPassword]),
    email: new FormControl('', [Validators.required, EmailValidator.validEmail])
  }, {
    validators: [Validation.match('password', 'confirmPassword')]
  })
  /*
  , PasswordValidator.validPassword

   */
  //util
  isHandset$ = this.breakpointUtil.isHandset$;

  //public

  //protected
  togglePassword() {
    this.isEnterPassword = !this.isEnterPassword;
  }

  toggleConfirmPassword() {
    this.isConfirmPassword = !this.isConfirmPassword
  }

  isSamePassword() {
    return this.isEnterPassword === this.isConfirmPassword;
  }

  signIn() {
    let username = this.getUsername();
    let password = this.getPassword();
    let email = this.getEmail();
    if (username !== null && password !== null && email !== null) {
      this.userService.postSignInRequest2({username: username, password: password, email: email}).subscribe({
        next: value => {
          this.login = false;
        },
        error: err => {

        }
      })
    }
  }

  getUsername() {
    return this.fgSignIn.controls.username.value
  }

  getPassword() {
    return this.fgSignIn.controls.password.value
  }

  getEmail() {
    return this.fgSignIn.controls.email.value;
  }


  isLogin() {
    return this.login;
  }

  isValid() {
    return this.fgSignIn.valid;
  }
}

