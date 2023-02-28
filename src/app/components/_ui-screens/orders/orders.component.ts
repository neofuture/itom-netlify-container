import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {UiService} from "../../../services/api/ui.service";
import {TabModel} from "../../../models/tab.model";
import {ActivatedRoute} from "@angular/router";
import {tabs} from "./tabs";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
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
    setTimeout(() => {
      this.uiService.setHeading('Orders');
    });
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
    this.initTabs()
  }

  initTabs() {
    this.activeTab = this.tabs[0].slug;
    if(this.route.children[0]) {
      this.route.children[0].url.subscribe((url: any) => {
        if (url[0]) {
          this.activeTab = url[0].path;
        }
        setTimeout(() => {
          this.uiService.setHeading('Orders - ' + this.tabs.find((t: any) => t.slug === this.activeTab)?.name);
        });
      });
    }
  }

  setTab(tab: any) {
    this.uiService.setHeading('Orders - ' + tab.name);
  }
}
