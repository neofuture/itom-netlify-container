import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {LogoutComponent} from './components/logout/logout.component';
import {ForgottenPasswordComponent} from './components/forgotten-password/forgotten-password.component';
import {LoginFormComponent} from './components/_forms/login-form/login-form.component';
import {
  ForgottenPasswordFormComponent
} from './components/_forms/forgotten-password-form/forgotten-password-form.component';
import {RegisterFormComponent} from './components/_forms/register-form/register-form.component';
import {ConfirmAccountFormComponent} from './components/_forms/confirm-account-form/confirm-account-form.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {LoadingComponent} from './components/loading/loading.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {NgOtpInputModule} from "ng-otp-input";
import {ErrorComponent} from './components/error/error.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ChannelsComponent} from './components/channels/channels.component';
import {InventoryComponent} from './components/inventory/inventory.component';
import {DeleteAccountComponent} from './components/delete-account/delete-account.component';
import {DeleteUserFormComponent} from './components/_forms/delete-user-form/delete-user-form.component';
import {ConfirmAccountComponent} from './components/confirm-account/confirm-account.component';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {SelectButtonModule} from "primeng/selectbutton";
import {LoginOtpFormComponent} from './components/_forms/login-otp-form/login-otp-form.component';
import {LoginOtpComponent} from './components/login-otp/login-otp.component';
import { UpdateUserFormComponent } from './components/_forms/update-user-form/update-user-form.component';
import { ResetPasswordFormComponent } from './components/_forms/reset-password-form/reset-password-form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UserStatusComponent } from './components/user-status/user-status.component';
import {UiService} from "./services/api/ui.service";
import {Observable} from "rxjs";
import { ShippingComponent } from './components/shipping/shipping.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { FulfilmentComponent } from './components/fulfilment/fulfilment.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SentItemsComponent } from './components/messages/sent-items/sent-items.component';
import { TrashComponent } from './components/messages/trash/trash.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ForgottenPasswordComponent,
    LoginFormComponent,
    ForgottenPasswordFormComponent,
    RegisterFormComponent,
    ConfirmAccountFormComponent,
    ResetPasswordComponent,
    NavigationComponent,
    LoadingComponent,
    ErrorComponent,
    DashboardComponent,
    SettingsComponent,
    ChannelsComponent,
    InventoryComponent,
    DeleteAccountComponent,
    DeleteUserFormComponent,
    ConfirmAccountComponent,
    LoginOtpComponent,
    LoginOtpFormComponent,
    UpdateUserFormComponent,
    ResetPasswordFormComponent,
    OrdersComponent,
    UserStatusComponent,
    ShippingComponent,
    TemplatesComponent,
    FulfilmentComponent,
    MessagesComponent,
    SentItemsComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    NgOtpInputModule,
    SelectButtonModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private heading: Observable<string>;
  constructor(
    private uiService: UiService
  ) {
    this.heading = this.uiService.heading;
  }
}
