import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() colour: string = '#97d442';
}
