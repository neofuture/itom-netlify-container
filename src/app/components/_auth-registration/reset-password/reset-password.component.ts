import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UiService} from "../../../services/api/ui.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute
  ) {
  }

  code: string = ''

  payload = {
    email: '',
    password: '',
    c_password: ''
  };
  email!: string;


  ngOnInit(): void {
    setTimeout(() => {
      this.uiService.setHeading('Reset Password');
    });
    if (this.route.snapshot.paramMap.get('code') !== null) {
      this.code = this.route.snapshot.paramMap.get('code') || '';
    }
    if (this.route.snapshot.paramMap.get('email') !== null) {
      this.email = this.route.snapshot.paramMap.get('email') || '';
      this.payload.email = this.email;
    }
  }


}
