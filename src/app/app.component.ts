import {Component, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AsyncPipe, CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavModule
} from "@angular/material/sidenav";
import {BreakpointObserver, Breakpoints, LayoutModule} from "@angular/cdk/layout";
import {map} from "rxjs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./service/user.service";
import {AuthserviceService} from "./service/authservice.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    AsyncPipe,
    MatButton,
    MatDrawer,
    MatDrawerContainer,
    NgIf,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    NgOptimizedImage
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weeplanbetter-web-angular';

  @ViewChild('sidenav')
  private sideNav?: MatSidenav

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private userservice: UserService,
              private authService: AuthserviceService,) {

  }

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  onDashboardClick() {
    this.router.navigate(['/dashboard'])
    this.closeSideNave()
  }

  onHomeClicked() {
    this.router.navigate(['/'])
    this.closeSideNave()
  }

  onLogoutClicked() {
    this.authService.logout();
    this.userservice.postLogout();
  }

  onLoginClicked() {
    this.router.navigate(['/login']);
    this.closeSideNave();
  }

  onSignUpClicked() {
    this.router.navigate(['/signup'])
    this.closeSideNave();
  }

  private closeSideNave() {
    if (this.sideNav) {
      this.sideNav.close();
    }
  }

  isLoggedIn() {
    return this.authService.isAuthenticated()
  }

  username() {
    return this.authService.getUsername()
  }

  onProfileClicked() {
    this.router.navigate(['/profile']);
    this.closeSideNave();
  }

  onSettingsClicked() {

  }
}
