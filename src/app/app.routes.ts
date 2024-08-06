import {Routes} from '@angular/router';
import {DashboardComponent} from "./user/dashboard/dashboard.component";
import {LoginComponent} from "./main/menu/login/login.component";
import {authGuardGuard} from "./guards/auth-guard.guard";
import {ProfileComponent} from "./user/profile/profile.component";
import {SignInComponent} from "./main/menu/sign-in/sign-in.component";
import {SuccessComponent} from "./dialogs/success/success.component";
import {EventDashboardComponent} from "./user/event/event-dashboard/event-dashboard.component";
import {GroupDashboardComponent} from "./user/group/group-dashboard/group-dashboard.component";

export const routes: Routes = [

  {path: "dashboard", component: DashboardComponent, canActivate: [authGuardGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [authGuardGuard]},
  {path: "events", component: EventDashboardComponent, canActivate: [authGuardGuard]},
  {path: "groups", component: GroupDashboardComponent, canActivate: [authGuardGuard]},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignInComponent},
  {path: "success", component: SuccessComponent}
];
