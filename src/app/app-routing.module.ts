import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ForgottenPasswordComponent} from "./components/forgotten-password/forgotten-password.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {ErrorComponent} from "./components/error/error.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {ChannelsComponent} from "./components/channels/channels.component";
import {InventoryComponent} from "./components/inventory/inventory.component";
import {DeleteAccountComponent} from "./components/delete-account/delete-account.component";
import {ConfirmAccountComponent} from "./components/confirm-account/confirm-account.component";
import {LoginOtpComponent} from "./components/login-otp/login-otp.component";
import {AuthGuard} from "./guards/auth.guard";
import {OrdersComponent} from "./components/orders/orders.component";
import {ShippingComponent} from "./components/shipping/shipping.component";
import {TemplatesComponent} from "./components/templates/templates.component";
import {FulfilmentComponent} from "./components/fulfilment/fulfilment.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {SentItemsComponent} from "./components/messages/sent-items/sent-items.component";
import {TrashComponent} from "./components/messages/trash/trash.component";


const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login/otp', component: LoginOtpComponent
  },
  {
    path: 'login/otp/:device', component: LoginOtpComponent
  },
  {
    path: 'login/otp/:device/:code', component: LoginOtpComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  {
    path: 'forgotten-password', component: ForgottenPasswordComponent
  },
  {
    path: 'reset-password/:code', component: ResetPasswordComponent
  },
  {
    path: 'reset-password/:code/:email', component: ResetPasswordComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'confirm-account/:device', component: ConfirmAccountComponent
  },
  {
    path: 'confirm-account/:device/:code', component: ConfirmAccountComponent
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'channels', component: ChannelsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'inventory/:activeTab', component: InventoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'shipping', component: ShippingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'templates', component: TemplatesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'fulfilment', component: FulfilmentComponent, canActivate: [AuthGuard]
  },
  {
    path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'messages/sent-items', component: SentItemsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'messages/trash', component: TrashComponent, canActivate: [AuthGuard]
  },
  {
    path: 'delete-account', component: DeleteAccountComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
