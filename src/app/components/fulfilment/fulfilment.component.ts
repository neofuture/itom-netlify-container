import { Component } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UiService} from "../../services/api/ui.service";

@Component({
  selector: 'app-fulfilment',
  templateUrl: './fulfilment.component.html',
  styleUrls: ['./fulfilment.component.css']
})
export class FulfilmentComponent {
  constructor(
    private userService: UserService,
    private uiService: UiService
  ) {
  }

  user: any = {status: 'unverified'};

  ngOnInit() {
    this.uiService.setHeading('Fulfilment');
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
  }
}
