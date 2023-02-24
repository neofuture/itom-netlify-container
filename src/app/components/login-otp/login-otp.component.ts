import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.css']
})
export class LoginOtpComponent implements OnInit{

  device = 'sms';
  deviceName: string = 'mobile phone'
  code: string = '';
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getToken()

    if (this.route.snapshot.paramMap.get('device') !== null) {
      this.device = this.route.snapshot.paramMap.get('device') || '';
      if(this.device === 'sms') {
        this.deviceName = 'mobile phone';
      }
      if(this.device === 'email') {
        this.deviceName = 'email address';
      }
    }
    if (this.route.snapshot.paramMap.get('code') !== null) {
      this.code = this.route.snapshot.paramMap.get('code') || '';
    }
  }

}
