import {Component, OnInit} from '@angular/core';
import {UiService} from "../../../services/api/ui.service";

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  constructor(
    private uiService: UiService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.uiService.setHeading('Forgotten Password');
    });
  }
  user = {
    email: ''
  }
}
