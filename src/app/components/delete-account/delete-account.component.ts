import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api/api.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit{
  status: any;
  user = {
    email: ''
  }
  constructor(
    private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  setStatus($event: any) {
    this.status = $event;
  }
}
