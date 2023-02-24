import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit{
  status: any;
  user = {
    email: 'carlfearby@me.com'
  }
  constructor() {
  }

  ngOnInit(): void {
  }

  setStatus($event: any) {
    this.status = $event;
  }
}
