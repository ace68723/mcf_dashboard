import { OrdersComponent } from './orders/orders.component';
import { SettlementComponent } from './settlements/settlements.component';
import { LoginComponent } from './login/login.componnet';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { MerchantComponent } from './merchant/merchant.component';
import { PaymentComponent } from './payment/payment.component';
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'settlement', component: SettlementComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  { path: 'order', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard]},
  { path: 'merchant', component: MerchantComponent, canActivate: [AuthGuard]},
  { path:  'login', component: LoginComponent},
  // { path: '**',redirectTo: 'home'  }
];
