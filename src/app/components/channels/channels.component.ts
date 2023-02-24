import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UiService} from "../../services/api/ui.service";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private uiService: UiService
  ) {
  }
  user: any = {status: 'unverified'};

  ngOnInit() {
    this.uiService.setHeading('Channels');
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
  }
}
