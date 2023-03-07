import {Component, OnInit} from '@angular/core';
import {UiService} from "../../../services/api/ui.service";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  constructor(
    private uiService: UiService,
  ) {
  }

  ngOnInit() {
    this.uiService.setHeading('Delete Account');
  }
  status: any;
  user = {
    email: ''
  }

  setStatus($event: any) {
    this.status = $event;
  }
}
