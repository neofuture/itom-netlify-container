import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api/api.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-forgotten-password-form',
  templateUrl: './forgotten-password-form.component.html',
  styleUrls: ['./forgotten-password-form.component.css',
    './extra-styles.css']
})
export class ForgottenPasswordFormComponent implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('')
  });
  submitted = false
  loading = false;

  ip: any;
  showMessage = false;
  formStatus = false;
  formMessage: string = '';
  formMessageDetails: any[] = [];
  @Input() heading: string | undefined;
  @Input() body: string | undefined;
  @Input() payload: any = {};
  @ViewChild('email', {static: true}) email?: ElementRef;
  private api = environment.api;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService) {
  }

  ngAfterViewInit() {
    this.email?.nativeElement.focus();
    setTimeout(() => {
      this.form.controls['email'].setValue('carlfearby@me.com');
    });
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
    this.apiService.call(this.api + '/v1/user/passwordResetLink/' + this.form.value.email, 'post',{}).subscribe((response: any) => {
      if (response.success === true) {
        this.formStatus = true;
        this.formMessage = response.message;
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
    this.loading = true;
  }

}
