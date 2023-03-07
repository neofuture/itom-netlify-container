import {Component, OnInit} from '@angular/core';
import {UiService} from "../../../services/api/ui.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private uiService: UiService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.uiService.setHeading('Register');
    });
  }
  user = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    c_password: ''
  };
}
