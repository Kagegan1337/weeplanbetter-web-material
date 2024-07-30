import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-empty',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss'
})
export class EmptyComponent {

}
