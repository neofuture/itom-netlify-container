import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UiService} from "../../../services/api/ui.service";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute

  ) {
  }

  code: string = '';
  device: string = 'sms'
  deviceName: string = 'mobile phone';

  ngOnInit() {
    this.uiService.setHeading('Confirm Account');

    if (this.route.snapshot.paramMap.get('code') !== null) {
      this.code = this.route.snapshot.paramMap.get('code') || '';
    }
    if (this.route.snapshot.paramMap.get('device') !== null) {
      this.device = this.route.snapshot.paramMap.get('device') || '';
    }
    if(this.device==='sms') {
      this.deviceName = 'mobile phone';
    }
    if(this.device==='email') {
      this.deviceName = 'email address';
    }
  }
}
