import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {UserService} from "../../../service/user.service";
import {AuthserviceService} from "../../../service/authservice.service";
import {Router} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {LoginFailureDialogComponent} from "../../../dialogs/login-failure-dialog/login-failure-dialog.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    NgIf,
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected isPassword = true;
  protected userError = false;

  constructor(private userService: UserService,
              private authService: AuthserviceService,
              private router: Router,
              private dialog: MatDialog) {
  }

  fgLogin = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  login() {
    if(this.getUsername() !== null && this.getPassword() !== null) {
      this.userService.postLoginRequest(
        {username: this.getUsername()!, password: this.getPassword()!}).subscribe({
        next: value => {
          this.authService.login(value.token);
          this.router.navigate(['/dashboard'])
        },
        error: err => {
          this.openDialog();
          this.userError = true;
        }
      });
    }
  }

  togglePassword() {
    this.isPassword = !this.isPassword;
  }

  forgotPassword() {
  }

  getUsername() {
    return this.fgLogin.controls.username.value;
  }
  getPassword() {
    return this.fgLogin.controls.password.value
  }

  openDialog() {
    this.dialog.open(LoginFailureDialogComponent)
    this.dialog.afterAllClosed.subscribe({
      next: value => {
        this.fgLogin.reset();
      }
    })
  }
}
