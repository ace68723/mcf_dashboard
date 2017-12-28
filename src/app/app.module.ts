import { OrdersComponent } from './orders/orders.component';
import { NewmerchantComponent } from './newmerchant/newmerchant.component';
import { PaymentComponent } from './payment/payment.component';
import { CompanyService } from './service/company.service';
import { TransactionComponent } from './transaction/transaction.component';
import { SettlementComponent } from './settlements/settlements.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScriptLoaderService } from './../js/script-loader.service';
import { AppService } from './app.service';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.componnet';
import { AuthGuard } from './auth/auth.guard';
import { MerchantComponent } from './merchant/merchant.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    SettlementComponent,
    LoginComponent,
    DashboardComponent,
    TransactionComponent,
    MerchantComponent,
    PaymentComponent,
    NewmerchantComponent,
    OrdersComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [AuthGuard, AppService, ScriptLoaderService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
