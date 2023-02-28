import {Component, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('mobileNav') mobileNav: any;

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

  openBurgerMenu() {
    this.mobileNav.nativeElement.classList.add('is-active');
  }

  closeBurgerMenu() {
    this.mobileNav.nativeElement.classList.remove('is-active');
  }
}
