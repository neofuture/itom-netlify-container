import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../services/api/api.service";
import {UserService} from "../../../services/user/user.service";
import Validation from './utils/validation';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    c_password: new FormControl(''),
  });
  submitted = false
  loading = false;
  private Validation = Validation;
  ip: any;
  api = environment.api;
  showMessage = false;
  formStatus = false;
  formMessage: string = '';
  @Input() heading: string | undefined;
  @Input() body: string | undefined;
  @Input() payload: any = {};
  @Input() code: string = '';
  @ViewChild('email', {static: true}) email?: ElementRef;

  formMessageDetails: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
  }

  ngAfterViewInit() {
    this.email?.nativeElement.focus();
    setTimeout(() => {
      for (let item in this.payload) {
        this.form.controls[item].setValue(this.payload[item]);
      }
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        c_password: [
          '',
          Validators.required
        ],
      },
      {
        validators: [
          this.Validation.match('password', 'c_password')
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
    this.form.value.code = this.code
    this.loading = true;

    console.log(this.form.value);
    this.apiService.call(this.api + '/v1/user/passwordReset', 'post', this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.formStatus = true;
        this.formMessage = response.message;
        this.form.reset();
      } else {

        this.formStatus = false;
        this.formMessage = response.error.message;
        this.formMessageDetails = [];
        for (let item in response.error.data) {
          this.formMessageDetails.push(response.error.data[item]);
        }
      }
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;

      }, 2500);

      this.loading = false;
    });
  }
}
