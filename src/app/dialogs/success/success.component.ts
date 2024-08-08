import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [
    MatButtonModule,

  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {

  @Input()
  public user: String | null = 'Kagegan';

  constructor(private router: Router) {
  }
  toLogin() {
    this.router.navigate(['/login'])
  }
}
