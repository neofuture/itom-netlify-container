import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiService} from "../../services/api/api.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token: any;
  user: any = {status: 'unverified'};
  message: string = '';
  loaded = false;
  ip = '';
  constructor(
    private apiService: ApiService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.userService.user.subscribe((user: any) => {
        this.user = user;
        if(user.first_name) {
          this.loaded = true;
        }
    });

this.apiService.getIp().subscribe((ip: any) => {
      this.ip = ip.ip;
    })


    setTimeout(() => {
      this.loaded = true;
    }, 300);
  }


}
