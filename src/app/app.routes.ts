import {Routes} from '@angular/router';
import {DashboardComponent} from "./user/dashboard/dashboard.component";
import {LoginComponent} from "./main/menu/login/login.component";
import {SignupComponent} from "./main/menu/signup/signup.component";
import {authGuardGuard} from "./guards/auth-guard.guard";
import {ProfileComponent} from "./user/profile/profile.component";
import {EventOverviewComponent} from "./event/event-overview/event-overview.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [

  {path: "dashboard", component: DashboardComponent, canActivate: [authGuardGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [authGuardGuard]},
  {path: "events", component: EventOverviewComponent, canActivate: [authGuardGuard]},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent}
];
