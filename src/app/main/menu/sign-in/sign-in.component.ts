import { Component } from '@angular/core';
import {BreakpointResolverService} from "../../../util/ui/breakpoint-resolver.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmailValidator} from "../../../validators/email-validator";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {UserService} from "../../../service/user.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router} from "@angular/router";

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

  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  constructor(private breakpointUtil: BreakpointResolverService,
              private userService: UserService,
              private router: Router) {
  }
  //variables
  protected isEnterPassword: boolean = true;
  protected isConfirmPassword: boolean = true;

  //forms
  fgSignIn = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, EmailValidator.validEmail])
  })
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
    if(username !== null && password !== null && email !== null) {
      this.userService.postSignInRequest2({username: username, password: password, email: email}).subscribe({
        next: value => {
          this.router.navigate(['/login'])
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


}

