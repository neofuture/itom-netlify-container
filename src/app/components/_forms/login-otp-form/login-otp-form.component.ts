import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {ApiService} from "../../../services/api/api.service";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-otp-form',
  templateUrl: './login-otp-form.component.html',
  styleUrls: ['./login-otp-form.component.css']
})
export class LoginOtpFormComponent implements OnInit{

  loading = false;
  @Input() heading: string | undefined;
  @Input() body: string | undefined;
  @Input() otpLength = 6;
  @Input() otp: string = '';
  @Input() device: string = '';
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  credentials: any;
  valid: boolean = false;
  ip: string = '';
  private api: string = environment.api;
  formStatus: boolean = false;
  formMessage: string = '';
  formMessageDetails: any = [];
  showMessage: boolean = false
  loadingResend: boolean = false;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ngOtpInputRef.setValue(this.otp);
    });
    this.credentials = this.userService.getCredentials();
    if(this.device === this.credentials.otp_location) {
      this.valid = true;
    }
    this.apiService.getIp().subscribe((ip: any) => {
      this.ip = ip.ip;
    });
  }

  onOtpChange($event: string) {
    this.otp = $event;
    if(this.otp.length === this.otpLength) {
      this.submit();
    }
  }

  submit(): void {
    this.loading = true;
    this.credentials.otp = this.otp;
    this.credentials.ip_address = this.ip;
    this.apiService.call(this.api + '/v1/auth/loginWithOtp', 'post',  this.credentials).subscribe((response: any) => {
      this.loading = false;
      if (response.success === true) {
        this.userService.setToken(response.data.token);
        if (response.success) {
          this.formStatus = true;
          this.formMessage = response.message;
        }
        this.userService.setToken(response.data.token);
        this.ngOtpInputRef.setValue('');
        this.userService.removeCredentials()
        this.userService.initUsers();

        setTimeout(() => {
          this.router.navigate(['/']).then(() => {});
        },3000);
      } else {
        this.formStatus = false;
        this.formMessage = response.error.message;
        this.formMessageDetails = []
        for (let item in response.error.data) {
          if(response.error.data[item]+'.' !== response.error.message){
            this.formMessageDetails.push(response.error.data[item]);
          }
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

  getNewCode() {
    this.loadingResend = true;
    this.apiService.call(this.api + '/v1/auth/sendOtp', 'post',  this.credentials).subscribe((response: any) => {
      this.loadingResend = false;
      if (response.success === true) {
        this.formStatus = true;
        this.formMessage = response.message;
      } else {
        this.formStatus = false;
        this.formMessage = response.error.message;
        this.formMessageDetails = []
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
}
