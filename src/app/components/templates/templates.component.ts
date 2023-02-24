import { Component } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UiService} from "../../services/api/ui.service";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent {
  constructor(
    private userService: UserService,
    private uiService: UiService
  ) {
  }

  user: any = {status: 'unverified'};

  ngOnInit() {
    this.uiService.setHeading('Templates');
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
  }
}
