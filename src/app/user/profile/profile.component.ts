import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {AsyncPipe, NgIf} from "@angular/common";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs";
import {AuthserviceService} from "../../service/authservice.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    AsyncPipe,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthserviceService) {
  }

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  username() {
    return this.authService.getUsername();
  }
}
