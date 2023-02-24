import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UiService} from "../../services/api/ui.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private uiService: UiService
  ) {
  }

  user: any = {status: 'unverified'};

  ngOnInit() {
    this.uiService.setHeading('Orders');
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
  }
}
