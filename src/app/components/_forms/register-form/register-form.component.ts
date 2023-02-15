import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation, {startsWith07} from './utils/validation';
import {ApiService} from "../../../services/api/api.service";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css',
    './extra-styles.css']
})
export class RegisterFormComponent implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone: new FormControl(''),
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
  @ViewChild('firstname', {static: true}) firstname?: ElementRef;
  @Input() payload: any = {};
  formMessageDetails: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService
  ) {
  }

  ngAfterViewInit() {
    this.firstname?.nativeElement.focus();
    setTimeout(() => {
      for (let item in this.payload) {
        this.form.controls[item].setValue(this.payload[item]);
      }
    })
  }

  ngOnInit(): void {
    this.apiService.getIp().subscribe((ip: any) => {
      this.ip = ip.ip;
    });
    this.form = this.formBuilder.group(
      {
        first_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ]
        ],
        last_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ]
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            startsWith07
          ]
        ],
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
    this.form.value.ip_address = this.ip
    this.form.value.phone = this.convertPhoneNumber(this.form.value.phone);
    this.loading = true;

    this.apiService.call(this.api + '/v1/user/register', 'post', this.form.value).subscribe((response: any) => {

      this.formMessageDetails = [];

      if (response.success === true) {
        this.formStatus = true;
        this.formMessage = response.message;
        this.formMessageDetails.push('Please check your email and SMS for confirmation one time passwords and links.')

        let credentials = {
          email: this.form.value.email,
          phone: this.form.value.phone
        };
        this.userService.storeOtpCredentials(credentials);
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

  convertPhoneNumber(phoneNumber: any) {
    if (phoneNumber.startsWith("0")) {
      return "44" + phoneNumber.slice(1);
    } else {
      return "44" + phoneNumber;
    }
  }
}
