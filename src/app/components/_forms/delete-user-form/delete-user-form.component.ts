import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api/api.service";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-delete-user-form',
  templateUrl: './delete-user-form.component.html',
  styleUrls: ['./delete-user-form.component.css']
})
export class DeleteUserFormComponent implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('')
  });
  submitted = false
  loading = false;

  ip: any;
  showMessage = false;
  @Input() heading: string | undefined;
  @Input() body: string | undefined;
  @Input() payload: any = {};
  @ViewChild('email', {static: true}) email?: ElementRef;
  @Output() status = new EventEmitter<any>();
  formStatus = false;
  formMessage: string = '';
  formMessageDetails: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService
  ) {
  }

  ngAfterViewInit() {
    this.email?.nativeElement.focus();
    setTimeout(() => {
      this.form.controls['email'].setValue('carlfearby@me.com');
    })
  }

  ngOnInit(): void {
    this.apiService.getIp().subscribe((ip: any) => {
      this.ip = ip.ip;
    });
    this.form = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.form.value.ip_address = this.ip
    this.apiService.call(environment.api + '/v1/user/' + this.form.controls['email'].value, 'delete', {}).subscribe((response: any) => {
      this.status.emit(response);
      this.loading = false;
      this.showMessage = true;

      if (response.success) {
        this.userService.unsetToken();
        this.formStatus = true;
        this.formMessage = response.message;
        this.form.reset();
        this.userService.initUsers()
      } else {
        this.formStatus = false;
        this.formMessage = response.error.message;
        this.formMessageDetails = [];
        for (let item in response.error.data) {
          this.formMessageDetails.push(response.error.data[item]);
        }
      }

      setTimeout(() => {
        this.showMessage = false;
      }, 2500);
    });
    this.loading = true;
  }
}
