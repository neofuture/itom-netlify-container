import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {ApiService} from "../../../services/api/api.service";
import Validation, {startsWith07} from './utils/validation';
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent implements OnInit, AfterViewInit {
  mobileForm: FormGroup = new FormGroup({
    phone: new FormControl('')
  });
  emailForm: FormGroup = new FormGroup({
    email: new FormControl('')
  });
  mobileSubmitted = false
  emailSubmitted = false
  mobileLoading = false;
  emailLoading = false;
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
  private user: any;
  private valid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngAfterViewInit() {
    this.firstname?.nativeElement.focus();
    setTimeout(() => {
      for (let item in this.payload) {
        if (this.mobileForm.controls[item]) {
          if (item === 'phone') {
            this.mobileForm.controls[item].setValue(this.payload[item].replace(/^(44)/, '0'));
          } else {
            this.mobileForm.controls[item].setValue(this.payload[item]);
          }
        }
        if (this.emailForm.controls[item]) {
          if (item === 'phone') {
            this.emailForm.controls[item].setValue(this.payload[item].replace(/^(44)/, '0'));
          } else {
            this.emailForm.controls[item].setValue(this.payload[item]);
          }
        }
      }

      let credentials = {
        email: this.emailForm.value.email,
        phone: this.convertPhoneNumber(this.mobileForm.value.phone)
      };
      this.userService.storeOtpCredentials(credentials);
    });

  }

  ngOnInit(): void {

    this.apiService.getIp().subscribe((ip: any) => {
      this.ip = ip.ip;
    });
    this.mobileForm = this.formBuilder.group(
      {
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            startsWith07
          ]
        ],
      }
    );
    this.emailForm = this.formBuilder.group(
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

  get ef(): { [key: string]: AbstractControl } {
    return this.emailForm.controls;
  }

  get mf(): { [key: string]: AbstractControl } {
    return this.mobileForm.controls;
  }

  onSubmitMobile(): void {
    this.mobileSubmitted = true;
    if (this.mobileForm.invalid) {
      return;
    }

    this.mobileLoading = true;

    this.apiService.call(this.api + '/v1/user/resendVerifySms/' + this.convertPhoneNumber(this.mobileForm.value.phone), 'post', {}).subscribe((response: any) => {
      this.mobileLoading = false;
      if (response.success === true) {
        this.formMessageDetails = [];
        this.formStatus = true;
        this.formMessage = response.message;
        let credentials = {
          email: this.emailForm.value.email,
          phone: this.convertPhoneNumber(this.mobileForm.value.phone)
        };
        this.userService.storeOtpCredentials(credentials);
        setTimeout(() => {
          this.router.navigateByUrl('/confirm-account/sms').then();
        }, 3000);
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
    });
  }

  onSubmitEmail(): void {
    this.emailSubmitted = true;
    if (this.mobileForm.invalid) {
      return;
    }
    this.emailLoading = true;

    this.apiService.call(this.api + '/v1/user/resendVerifyEmail/' + this.emailForm.value.email, 'post', {}).subscribe((response: any) => {
      this.emailLoading = false;
      if (response.success === true) {
        this.formMessageDetails = [];
        this.formStatus = true;
        this.formMessage = response.message;
        let credentials = {
          email: this.emailForm.value.email,
          phone: this.convertPhoneNumber(this.mobileForm.value.phone)
        };
        this.userService.storeOtpCredentials(credentials);
        setTimeout(() => {
          this.router.navigateByUrl('/confirm-account/email').then();
        }, 3000);
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
