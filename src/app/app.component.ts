import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user/user.service";
import {UiService} from "./services/api/ui.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSidebarOpen: boolean = localStorage.getItem('sidebar') !== 'false'
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
    this.isSidebarOpen = !this.isSidebarOpen;
    localStorage.setItem('sidebar', this.isSidebarOpen.toString());
  }
}
