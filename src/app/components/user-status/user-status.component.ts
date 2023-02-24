import {Component, Input} from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent {
  user: any = {status: 'unverified'};
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
