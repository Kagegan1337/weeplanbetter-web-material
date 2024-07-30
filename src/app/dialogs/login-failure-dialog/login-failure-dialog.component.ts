import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login-failure-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogTitle
  ],
  templateUrl: './login-failure-dialog.component.html',
  styleUrl: './login-failure-dialog.component.scss'
})
export class LoginFailureDialogComponent {

  @Output()
  onCloseEvent: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.onCloseEvent.emit();
  }

}
