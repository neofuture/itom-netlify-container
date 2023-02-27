import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api/api.service";
import {UserService} from "../../../services/user/user.service";
import {UiService} from "../../../services/api/ui.service";
import {TabModel} from "../../../models/tab.model";
import {ActivatedRoute} from "@angular/router";
import {tabs} from "./tabs";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  enableTabs = false;

  tabs: TabModel[] = tabs;
  activeTab = '';
  path: string = '';
  token: any;
  user: any = {status: 'unverified'};
  message: string = '';
  loaded = false;
  ip = '';

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private uiService: UiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.uiService.setHeading('Dashboard');
    this.userService.user.subscribe((user: any) => {
      this.user = user;
      if (user.first_name) {
        this.loaded = true;
      }
      this.initTabs();
    });

    this.apiService.getIp().subscribe((ip: any) => {
      this.ip = ip.ip;
    })


    setTimeout(() => {
      this.loaded = true;
    }, 300);
  }

  initTabs() {
    this.activeTab = this.tabs[0].slug;
    this.route.children[0].url.subscribe((url: any) => {
      if (url[0]) {
        this.activeTab = url[0].path;
      }
      setTimeout(() => {
        this.uiService.setHeading('Fulfilment - ' + this.tabs.find((t: any) => t.slug === this.activeTab)?.name);
      });
    });
  }

  setTab(tab: any) {
    this.uiService.setHeading('Fulfilment - ' + tab.name);
  }
}
