import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  code: string = ''

  user = {
    email: '',
    password: '',
    c_password: ''
  };

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('code') !== null) {
      this.code = this.route.snapshot.paramMap.get('code') || '';
    }
  }


}
