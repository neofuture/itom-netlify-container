import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ForgottenPasswordComponent} from "./components/forgotten-password/forgotten-password.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {ErrorComponent} from "./components/error/error.component";
import {DashboardComponent} from "./components/_ui-screens/dashboard/dashboard.component";
import {SettingsComponent} from "./components/_ui-screens/settings/settings.component";
import {ChannelsComponent} from "./components/_ui-screens/channels/channels.component";
import {InventoryComponent} from "./components/_ui-screens/inventory/inventory.component";
import {DeleteAccountComponent} from "./components/delete-account/delete-account.component";
import {ConfirmAccountComponent} from "./components/confirm-account/confirm-account.component";
import {LoginOtpComponent} from "./components/login-otp/login-otp.component";
import {AuthGuard} from "./guards/auth.guard";
import {OrdersComponent} from "./components/_ui-screens/orders/orders.component";
import {ShippingComponent} from "./components/_ui-screens/shipping/shipping.component";
import {TemplatesComponent} from "./components/_ui-screens/templates/templates.component";
import {FulfilmentComponent} from "./components/_ui-screens/fulfilment/fulfilment.component";
import {MessagesComponent} from "./components/_ui-screens/messages/messages.component";
import {SentItemsComponent} from "./components/_ui-screens/messages/sent-items/sent-items.component";
import {TrashComponent} from "./components/_ui-screens/messages/trash/trash.component";
import {InboxComponent} from "./components/_ui-screens/messages/inbox/inbox.component";
import {ProductsComponent} from "./components/_ui-screens/inventory/products/products.component";
import {CategoriesComponent} from "./components/_ui-screens/inventory/categories/categories.component";
import {BrandsComponent} from "./components/_ui-screens/inventory/brands/brands.component";
import {AttributesComponent} from "./components/_ui-screens/inventory/attributes/attributes.component";
import {VariantsComponent} from "./components/_ui-screens/inventory/variants/variants.component";
import {CollectionsComponent} from "./components/_ui-screens/inventory/collections/collections.component";


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
    path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', component: ProductsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]
      },
      {
        path: 'brands', component: BrandsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'attributes', component: AttributesComponent, canActivate: [AuthGuard]
      },
      {
        path: 'variants', component: VariantsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'collections', component: CollectionsComponent, canActivate: [AuthGuard]
      }
      ]
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
    path: 'messages', component: MessagesComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', component: InboxComponent, canActivate: [AuthGuard]
      },
      {
        path: 'sent-items', component: SentItemsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'trash', component: TrashComponent, canActivate: [AuthGuard]
      },
      ]
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
