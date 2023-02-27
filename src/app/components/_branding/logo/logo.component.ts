import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() colour: string = '#97d442';
}
