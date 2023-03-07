import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TabModel} from "../../../models/tab.model";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent{
  @Input() url: string = '';
  @Input() tabs: TabModel[] = [];
  @Input() activeTab: string = '';
  @Output() activeTabChange = new EventEmitter<TabModel>()
  @Output() heading = new EventEmitter<string>()
  private path: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.path = this.route.pathFromRoot
      .map(route => route.routeConfig && route.routeConfig.path)
      .filter(path => !!path)
      .join('/')
  }
  setTab(tab: TabModel) {
    this.activeTabChange.emit(tab);
    this.activeTab = tab.slug;
    this.router.navigateByUrl('/' + this.path +
      (tab.slug !== '' ? '/' + tab.slug : '')
    ).then();
  }
}
