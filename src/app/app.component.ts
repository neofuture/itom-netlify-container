import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user/user.service";
import {RouterOutlet} from "@angular/router";
import {UiService} from "./services/api/ui.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'itom-frontend';
  isSidebarOpen: boolean = localStorage.getItem('sidebar') === 'false' ? false : true
  heading = '';

  constructor(
    private userService: UserService,
    private uiService: UiService
  ) {
    this.userService.initUsers();
  }

  ngOnInit() {
    this.uiService.heading.subscribe((heading: string) => {
      this.heading = heading;
    });
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
