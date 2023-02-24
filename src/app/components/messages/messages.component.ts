import { Component } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UiService} from "../../services/api/ui.service";
import {ActivatedRoute} from "@angular/router";

interface ngOnInit {
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements ngOnInit {
  tabs = [
    {name: 'Inbox', slug: '', icon: 'fa-inbox', badge: 3},
    {name: 'Sent Items', slug: 'sent-items', icon: 'fa-paper-plane', badge: 0},
    {name: 'Trash', slug: 'trash', icon: 'fa-trash', badge: 0},
  ];
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
    setTimeout(() => {
      this.uiService.setHeading(this.component + ' - ' + this.getTab(this.activeTab)?.name);
    });
    this.userService.user.subscribe((user: any) => {
      this.user = user;
    });
    if (this.route.snapshot.paramMap.get('activeTab') !== null) {
      this.activeTab = this.route.snapshot.paramMap.get('activeTab') || this.tabs[0].slug;
    }
  }

  getTab(tab: any) {
    return this.tabs.find(
      (t: any) => t.slug === tab);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.uiService.setHeading(this.component + ' - ' + this.getTab(this.activeTab)?.name);
  }
}
