import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api/api.service";
import {UserService} from "../../../services/user/user.service";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css',
    './extra-styles.css']
})
export class LoginFormComponent implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false
  loading = false;

  ip: any;
  api = environment.api;
  showMessage = false;
  formStatus = false;
  formMessage: string = '';
  @Input() heading: string | undefined;
  @Input() body: string | undefined;
  @Input() payload: any = {};
  @ViewChild('email', {static: true}) email?: ElementRef;

  formMessageDetails: any[] = [];
  otpLocations: any;
  selectedOtp = 'sms';
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngAfterViewInit() {
    this.email?.nativeElement.focus();
    setTimeout(() => {
      for (let item in this.payload) {
        this.form.controls[item].setValue(this.payload[item]);
      }
    });
  }

  ngOnInit(): void {
    this.token = this.userService.decodeToken();
    this.otpLocations = [
      {label: 'SMS', value: 'sms'},
      {label: 'Email', value: 'email'},
    ];

    // this.apiService.getIp().subscribe((ip: any) => {
    //   this.ip = ip.ip;
    // });
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
    // this.form.value.ip_address = this.ip
    this.form.value.otp_location = this.selectedOtp
    this.loading = true;

    this.apiService.call(this.api + '/v1/auth/sendOtp', 'post', this.form.value).subscribe((response: any) => {

      if (response.success === true) {
        this.userService.setToken(response.data.token);
        this.formStatus = true;
        this.formMessage = response.message;

        this.userService.storeCredentials(this.form.value);
        setTimeout(() => {
          this.router.navigate(['/login/otp/' + this.selectedOtp]).then(() => {
          });
        }, 2500);
      } else {

        this.formStatus = false;
        this.formMessage = response.error.message;
        this.formMessageDetails = [];
        for (let item in response.error.data) {
          if (response.error.data[item] + '.' !== response.error.message) {
            this.formMessageDetails.push(response.error.data[item]);
          }
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
