import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-horizontal-line',
  standalone: true,
  imports: [],
  templateUrl: './horizontal-line.component.html',
  styleUrl: './horizontal-line.component.scss'
})
export class HorizontalLineComponent {

  @Input()
  sectionText: string = ""
  text() {
    return this.sectionText;
  }
}
