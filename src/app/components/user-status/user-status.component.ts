import {Component} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UserAccountModel} from "../../models/user-account.model";

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent {
  user: UserAccountModel = {status: 'unverified', first_name: '', last_name: ''};
  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
  }
}
