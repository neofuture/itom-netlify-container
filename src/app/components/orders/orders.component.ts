import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private userService: UserService) {
  }

  user: any = {status: 'unverified'};

  ngOnInit() {
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
  }
}
