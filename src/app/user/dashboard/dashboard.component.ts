import { Component } from '@angular/core';
import {MatCard, MatCardModule} from "@angular/material/card";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatList, MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    CdkDropListGroup,
    MatDatepickerModule,
    CdkDropList,
    NgSwitch,
    MatListModule,
    NgForOf,
    CdkDrag,
    NgSwitchCase,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  editMode: boolean = false;

  items = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
