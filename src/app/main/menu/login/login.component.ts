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
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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
  protected userName: string = "";
  protected password: string = "";

  protected userError = false;

  constructor(private userService: UserService,
              private authService: AuthserviceService,
              private router: Router) {
  }

  login() {
    this.userService.postLoginRequest(
      {username: this.userName, password: this.password}).subscribe({
      next: value => {
        this.authService.login(value.token);
        this.router.navigate(['/dashboard'])
      },
      error: err => {
        this.userError = true;
      }
    });
  }

  togglePassword() {
    this.isPassword = !this.isPassword;
  }

  forgotPassword() {

  }
}
