import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  constructor(private userService: UserService) {
  }

  user: any = {status: 'unverified'};

  ngOnInit() {
    this.userService.user.subscribe((user: any) => {
        this.user = user;
    });
  }
}
