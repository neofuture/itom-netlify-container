import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UiService} from "../../services/api/ui.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  tabs = [
    {name: 'Products', slug: 'products', icon: 'fa-shopping-cart', badge: 0},
    {name: 'Categories', slug: 'categories', icon: 'fa-list', badge: 0},
    {name: 'Brands', slug: 'brands', icon: 'fa-copyright', badge: 0},
    {name: 'Attributes', slug: 'attributes', icon: 'fa-list-ol', badge: 0},
    {name: 'Variants', slug: 'variants', icon: 'fa-timeline', badge: 0},
    {name: 'Collections', slug: 'collections', icon: 'fa-layer-group', badge: 0},
  ];

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
      this.uiService.setHeading('Inventory' + ' - ' + this.getTab(this.activeTab)?.name);
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
    this.uiService.setHeading('Inventory' + ' - ' + this.getTab(this.activeTab)?.name);
  }
}
