import { Component } from '@angular/core';
import {UserService} from "./services/user/user.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'itom-frontend';
  isSidebarOpen: boolean = localStorage.getItem('sidebar') === 'false' ? false : true

  constructor(
    private userService: UserService,
  ) {
    this.userService.initUsers();
  }

  toggleSidebar() {
    if(this.isSidebarOpen) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
    localStorage.setItem('sidebar', this.isSidebarOpen.toString());
  }
}
