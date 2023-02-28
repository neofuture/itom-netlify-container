import {Component, OnInit} from '@angular/core';
import {UiService} from "../../../services/api/ui.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private uiService: UiService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.uiService.setHeading('Login');
    });
  }
  user = {
    email: '',
    password: ''
  }
}
