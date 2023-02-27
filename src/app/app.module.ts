import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/_auth-registration/login/login.component';
import {RegisterComponent} from './components/_auth-registration/register/register.component';
import {LogoutComponent} from './components/_auth-registration/logout/logout.component';
import {ForgottenPasswordComponent} from './components/_auth-registration/forgotten-password/forgotten-password.component';
import {LoginFormComponent} from './components/_forms/login-form/login-form.component';
import {
  ForgottenPasswordFormComponent
} from './components/_forms/forgotten-password-form/forgotten-password-form.component';
import {RegisterFormComponent} from './components/_forms/register-form/register-form.component';
import {ConfirmAccountFormComponent} from './components/_forms/confirm-account-form/confirm-account-form.component';
import {ResetPasswordComponent} from './components/_auth-registration/reset-password/reset-password.component';
import {NavigationComponent} from './components/_controls/navigation/navigation.component';
import {LoadingComponent} from './components/_controls/loading/loading.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {NgOtpInputModule} from "ng-otp-input";
import {ErrorComponent} from './components/_ui-screens/error/error.component';
import {DashboardComponent} from './components/_ui-screens/dashboard/dashboard.component';
import {SettingsComponent} from './components/_ui-screens/settings/settings.component';
import {ChannelsComponent} from './components/_ui-screens/channels/channels.component';
import {InventoryComponent} from './components/_ui-screens/inventory/inventory.component';
import {DeleteAccountComponent} from './components/_auth-registration/delete-account/delete-account.component';
import {DeleteUserFormComponent} from './components/_forms/delete-user-form/delete-user-form.component';
import {ConfirmAccountComponent} from './components/_auth-registration/confirm-account/confirm-account.component';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {SelectButtonModule} from "primeng/selectbutton";
import {LoginOtpFormComponent} from './components/_forms/login-otp-form/login-otp-form.component';
import {LoginOtpComponent} from './components/_auth-registration/login-otp/login-otp.component';
import { UpdateUserFormComponent } from './components/_forms/update-user-form/update-user-form.component';
import { ResetPasswordFormComponent } from './components/_forms/reset-password-form/reset-password-form.component';
import { OrdersComponent } from './components/_ui-screens/orders/orders.component';
import { UserStatusComponent } from './components/_controls/user-status/user-status.component';
import {UiService} from "./services/api/ui.service";
import {Observable} from "rxjs";
import { ShippingComponent } from './components/_ui-screens/shipping/shipping.component';
import { TemplatesComponent } from './components/_ui-screens/templates/templates.component';
import { FulfilmentComponent } from './components/_ui-screens/fulfilment/fulfilment.component';
import { MessagesComponent } from './components/_ui-screens/messages/messages.component';
import { SentItemsComponent } from './components/_ui-screens/messages/sent-items/sent-items.component';
import { TrashComponent } from './components/_ui-screens/messages/trash/trash.component';
import { IconComponent } from './components/_branding/icon/icon.component';
import { LogoComponent } from './components/_branding/logo/logo.component';
import { TabsComponent } from './components/_controls/tabs/tabs.component';
import { InboxComponent } from './components/_ui-screens/messages/inbox/inbox.component';
import { ProductsComponent } from './components/_ui-screens/inventory/products/products.component';
import { CategoriesComponent } from './components/_ui-screens/inventory/categories/categories.component';
import { BrandsComponent } from './components/_ui-screens/inventory/brands/brands.component';
import { AttributesComponent } from './components/_ui-screens/inventory/attributes/attributes.component';
import { VariantsComponent } from './components/_ui-screens/inventory/variants/variants.component';
import { CollectionsComponent } from './components/_ui-screens/inventory/collections/collections.component';

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
    TrashComponent,
    IconComponent,
    LogoComponent,
    TabsComponent,
    InboxComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    AttributesComponent,
    VariantsComponent,
    CollectionsComponent
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
