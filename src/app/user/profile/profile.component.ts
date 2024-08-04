import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {AsyncPipe, DatePipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs";
import {AuthserviceService} from "../../service/authservice.service";
import {UserService} from "../../service/user.service";
import {ProfilDto} from "../../model/dto/user/profil-dto";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {SectionComponent} from "../../components/base/section/section.component";
import {BreakpointResolverService} from "../../util/ui/breakpoint-resolver.service";
import {HorizontalLineComponent} from "../../components/base/horizontal-line/horizontal-line.component";
import {MatBadge, MatBadgeModule} from "@angular/material/badge";
import {MatDialog} from "@angular/material/dialog";
import {LoginFailureDialogComponent} from "../../dialogs/login-failure-dialog/login-failure-dialog.component";
import {LoadingDialogComponent} from "../../dialogs/loading-dialog/loading-dialog.component";

export interface AccountTier {
  name: string;
  type: AccountTierType
}

export enum AccountTierType {
  GUEST,
  USER,
  PREMIUM,
  ADMIN,
  NONE
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    AsyncPipe,
    MatDividerModule,
    SectionComponent,
    HorizontalLineComponent,
    MatBadgeModule,
    NgClass,
    NgStyle,
    DatePipe,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private breakpointObserver: BreakpointObserver,
              private breakpointUtil: BreakpointResolverService,
              private authService: AuthserviceService,
              private userService: UserService,
              private loadingDialog: MatDialog) {
  }

  private userToken: string = this.authService.getUserIdFromToken();
  protected profile : ProfilDto = {} as ProfilDto;

  ngOnInit() {
    this.openDialog();
    this.userService.getLoadUserData(this.userToken).subscribe({
      next: value => {
        console.log(value)
        this.profile = value;
        this.closeDialog();
      },
      error: err => {
        this.closeDialog();
      }
    })
  }

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  isPhone$ = this.breakpointUtil.isPhone$;

  username() {
    return this.authService.getUsername();
  }

  displayName() {
    return "Display"
  }

  firstname() {
    return (this.profile.firstName !== null && this.profile.firstName !== undefined) ? this.profile.firstName : '';
  }

  lastname() {
    return (this.profile.lastName !== null && this.profile.lastName !== undefined) ? this.profile.lastName : '';
  }

  birth() {
    return (this.profile.birth !== null && this.profile.birth !== undefined) ? this.profile.birth : ''
  }

  since() {
    return (this.profile.since !== null && this.profile.since !== undefined) ? this.profile.since : ''
  }

  name() {
    return `${this.firstname()} ${this.lastname()}`;
  }

  email() {
    return (this.profile.email !== null && this.profile.email !== undefined) ? this.profile.email : '';
  }

  privacy() {
    return "";
  }

  verified() {
    return this.profile.verified;
  }

  verificationString():string  {
    return this.profile.verified ? "verified" : "not-verified";
  }

  openDialog() {
    this.loadingDialog.open(LoadingDialogComponent)
  }

  closeDialog() {
    this.loadingDialog.closeAll();
  }

  strasse() {
    return "";
  }

  accountTier() {
    switch (this.profile.role) {
      case 0:
        return {name: 'Gast', type: AccountTierType.GUEST} as AccountTier;
      case 1:
        return {name: 'Nutzer', type: AccountTierType.USER} as AccountTier;
      case 2:
        return {name: 'Premium',type: AccountTierType.PREMIUM} as AccountTier;
      case 3:
        return {name: 'Admin', type: AccountTierType.ADMIN} as AccountTier;
      default:
        return {name: '', type: AccountTierType.NONE} as AccountTier;
    }
  }

  protected readonly AccountTierType = AccountTierType;

  accountTierClass() {
    const type = this.accountTier().type;
    switch (type) {
      case AccountTierType.ADMIN:
        return 'admin'
      case AccountTierType.GUEST:
        return 'guest'
      case AccountTierType.PREMIUM:
        return 'premium'
      case AccountTierType.NONE:
        return '';
      case AccountTierType.USER:
        return 'user'
    }
  }

}
