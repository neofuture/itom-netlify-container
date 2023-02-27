import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {UiService} from "../../../services/api/ui.service";
import {TabModel} from "../../../models/tab.model";
import {ActivatedRoute} from "@angular/router";
import {tabs} from "./tabs";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  enableTabs = false;

  tabs: TabModel[] = tabs;
  activeTab = '';
  path: string = '';

  constructor(
    private userService: UserService,
    private uiService: UiService,
    private route: ActivatedRoute
  ) {
  }

  user: any = {status: 'unverified'};

  ngOnInit() {
    this.uiService.setHeading('Settings');
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
    this.initTabs()
  }

  initTabs() {
    this.activeTab = this.tabs[0].slug;
    this.route.children[0].url.subscribe((url: any) => {
      if (url[0]) {
        this.activeTab = url[0].path;
      }
      setTimeout(() => {
        this.uiService.setHeading('Settings - ' + this.tabs.find((t: any) => t.slug === this.activeTab)?.name);
      });
    });
  }

  setTab(tab: any) {
    this.uiService.setHeading('Settings - ' + tab.name);
  }
}
