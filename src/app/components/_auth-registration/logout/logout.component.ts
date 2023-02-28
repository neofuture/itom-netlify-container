import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {UiService} from "../../../services/api/ui.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private uiService: UiService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.uiService.setHeading('Login');
    });

    this.userService.logout()
  }
}
