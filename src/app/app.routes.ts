import {Routes} from '@angular/router';
import {DashboardComponent} from "./user/dashboard/dashboard.component";
import {LoginComponent} from "./main/menu/login/login.component";

export const routes: Routes = [

  {path: "dashboard", component: DashboardComponent},
  {path: "login", component: LoginComponent}
];
