import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    c_password: ''
  };

  ngOnInit(): void {
    this.user = {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
      c_password: ''
    }
  }

}
