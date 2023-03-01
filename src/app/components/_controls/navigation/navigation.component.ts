import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  version = '0.0.125';
  user: any = {status: 'unverified'};
  @Input() isOpen: boolean = true;
  @Output() clicked = new EventEmitter<boolean>();
  @Input() isMobile: boolean = false;
  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
  }

  fireClickEvent() {
    this.clicked.emit(true);
  }
}
