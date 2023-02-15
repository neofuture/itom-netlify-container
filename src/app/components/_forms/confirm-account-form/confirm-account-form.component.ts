import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {ApiService} from "../../../services/api/api.service";
import {UserService} from "../../../services/user/user.service";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-account-form',
  templateUrl: './confirm-account-form.component.html',
  styleUrls: ['./confirm-account-form.component.css',
    './extra-styles.css']
})

export class ConfirmAccountFormComponent implements OnInit {
  loading = false;
  @Input() heading: string | undefined;
  @Input() body: string | undefined;
  @Input() otpLength = 5;
  @Input() otp: string = '';
  @Input() device: string = '';
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  user: any;
  private api: string = environment.api;
  formStatus: boolean = false;
  formMessage: string = '';
  formMessageDetails: any = [];
  showMessage: boolean = false
  requestLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ngOtpInputRef.setValue(this.otp);
    });
    this.user = this.userService.getOtpCredentials();
  }

  onOtpChange($event: string) {
    this.otp = $event;
    if(this.otp.length === this.otpLength) {
      this.confirmAccount();
    }
  }


  confirmAccount() {
    let api = this.api;
    if (this.device === 'sms') {
      api += '/v1/user/verifySms/' + this.user.email + '/' + this.otp;
    }
    if (this.device === 'email') {
      api += '/v1/user/verifyEmail/' + this.user.email + '/' + this.otp;
    }
    this.apiService.call(api, 'post', {}).subscribe((response: any) => {
      this.requestLoading = false;
      if (response.success === true) {
        this.formMessageDetails = [];
        this.formStatus = true;
        this.formMessage = response.message;
        this.userService.initUsers()
        this.ngOtpInputRef.setValue('');
        setTimeout(() => {
          this.router.navigate(['/']).then(() => {});
        },3000);
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

  requestNewCode() {
    this.requestLoading = true;
    let api = this.api;
    if (this.device === 'sms') {
      api += '/v1/user/resendVerifySms/' + this.user.phone;
    }
    if (this.device === 'email') {
      api += '/v1/user/resendVerifyEmail/' + this.user.email;
    }
    this.apiService.call(api, 'post', {}).subscribe((response: any) => {
      this.requestLoading = false;
      if (response.success === true) {
        this.formMessageDetails = [];
        this.formStatus = true;
        this.formMessage = response.message;
      } else {
        this.formStatus = false;
        this.formMessage = response.error.message;
        this.formMessageDetails = [];
        for (let item in response.error.data) {
          this.formMessageDetails.push(response.error.data[item]);
        }
      }
      this.showMessage = true;
      this.ngOtpInputRef.setValue('');
      this.otp = ''

      setTimeout(() => {
        this.showMessage = false;
      }, 2500);
    });
  }
}
