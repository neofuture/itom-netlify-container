import { Component } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {UiService} from "../../../services/api/ui.service";
import {ActivatedRoute} from "@angular/router";
import {tabs} from "./tabs";
import {TabModel} from "../../../models/tab.model";
interface ngOnInit {
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements ngOnInit {
  enableTabs = true;

  tabs: TabModel[] = tabs;
  component = 'Messages';
  activeTab = this.tabs[0].slug;

  constructor(
    private userService: UserService,
    private uiService: UiService,
    private route: ActivatedRoute
  ) {
  }

  user: any = {status: 'unverified'};

  ngOnInit() {
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
    this.initTabs();
  }

  initTabs() {
    this.activeTab = this.tabs[0].slug;
    this.route.children[0].url.subscribe((url: any) => {
      if (url[0]) {
        this.activeTab = url[0].path;
      }
      setTimeout(() => {
        this.uiService.setHeading('Inventory - ' + this.tabs.find((t: any) => t.slug === this.activeTab)?.name);
      });
    });
  }

  setTab(tab: any) {
    this.uiService.setHeading('Inventory - ' + tab.name);
  }

}
