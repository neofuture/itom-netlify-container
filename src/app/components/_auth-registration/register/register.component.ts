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
      first_name: 'Carl',
      last_name: 'Fearby',
      phone: '07940147138',
      email: 'carlfearby@me.com',
      password: 'Testing1234!',
      c_password: 'Testing1234!'
    }
  }

}
