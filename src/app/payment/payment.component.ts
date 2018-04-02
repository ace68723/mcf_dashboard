import { CompanyService } from './../service/company.service';
import { Component, OnChanges, SimpleChanges, Input, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../js/script-loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styles: [`
    .some-class {
      background-color:#ffb822;
      color:white !important;
    }
  `],
})

export class PaymentComponent implements OnInit, AfterViewInit {
  page_num: number;
  payments: any = [];
  pageNumArray: any = [];
  page_size: number;
  account_id: number;
  i: any;
  total_page: number;
  randomcolor: any;
  constructor(private _script: ScriptLoaderService, private appService: AppService, private cpyService: CompanyService,
    public route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    if (!localStorage.getItem('selectPayment')) {
      this.getMerchants();
     } else {
      this.account_id = parseInt(localStorage.getItem('selectPayment'), 10);
      this.appService.getMerchantSettlementByid(this.page_num,  this.account_id).subscribe(
        event => {
          this.payments = event.ev_data.recs;
          this.page_num = event.ev_data.page_num;
          this.total_page = event.ev_data.total_page;
          this.payments.forEach(item => {
            if (item.is_remitted == 1) {
                  item.is_remitted = 'Remitted';
  
            } else {
              item.is_remitted = 'Not Remitted';
  
            }
          });
          this.payments.forEach(item => {
            const a = new Date(item.start_time * 1000);
            item.start_time = a.toLocaleString();
            return item.start_time;
           });
           this.payments.forEach(item => {
            const a = new Date(item.end_time * 1000);
            item.end_time = a.toLocaleString();
            return item.end_time;
           });
           this.payments.forEach(item => {
            item.pay_in_cent = item.pay_in_cent / 100;
            item.comm_in_cent = item.comm_in_cent / 100;
            item.amount_in_cent = item.amount_in_cent / 100;
          });
          localStorage.removeItem('selectPayment');

        }
      );
      setTimeout(() => {
        this.getNumber();
      }, 2000);
      console.log(this.pageNumArray);
     }
  }
  ngAfterViewInit() {

  }
  getNumber() {
    return this.pageNumArray = new Array(this.total_page);

  }


  saveAccountID(item) {
    console.log(item);
    localStorage.setItem('account_id', item.account_id);
    localStorage.setItem('merchantname', item.display_name);
    localStorage.setItem('merchantID', item.merchant_id);
    this.router.navigate(['merchant']);
  }
  goToPage(i) {
    if (!this.account_id) {
      this.page_num = i + 1;
      this.appService.getMerchantSettlement(i + 1).subscribe(
        event => {
          this.payments = event.ev_data.recs;
          this.page_num = event.ev_data.page_num;
          this.total_page = event.ev_data.total_page;
          this.payments.forEach(item => {
            if (item.is_remitted == 1) {
                  item.is_remitted = 'Remitted';
            } else {
              item.is_remitted = 'Not Remitted';
            }
          });
          this.payments.forEach(item => {
            const a = new Date(item.start_time * 1000);
            item.start_time = a.toLocaleString();
            return item.start_time;
           });
           this.payments.forEach(item => {
            const a = new Date(item.end_time * 1000);
            item.end_time = a.toLocaleString();
            return item.end_time;
           });
           this.payments.forEach(item => {
            item.pay_in_cent = item.pay_in_cent / 100;
            item.comm_in_cent = item.comm_in_cent / 100;
            item.amount_in_cent = item.amount_in_cent / 100;
           });
        }
      );
    } else {
      this.page_num = i + 1;
    this.appService.getMerchantSettlementByid(i + 1, this.account_id).subscribe(
      event => {
        this.payments = event.ev_data.recs;
        this.page_num = event.ev_data.page_num;
        this.total_page = event.ev_data.total_page;
        this.payments.forEach(item => {
          if (item.is_remitted == 1) {
                item.is_remitted = 'Remitted';
          } else {
            item.is_remitted = 'Not Remitted';
          }
        });
        this.payments.forEach(item => {
          const a = new Date(item.start_time * 1000);
          item.start_time = a.toLocaleString();
          return item.start_time;
         });
         this.payments.forEach(item => {
          const a = new Date(item.end_time * 1000);
          item.end_time = a.toLocaleString();
          return item.end_time;
         });
         this.payments.forEach(item => {
          item.pay_in_cent = item.pay_in_cent / 100;
          item.comm_in_cent = item.comm_in_cent / 100;
          item.amount_in_cent = item.amount_in_cent / 100;
         });
      }
    );
    }
    
  }
  getMerchants() {
    this.appService.getMerchantSettlement(this.page_num).subscribe(
      event => {
        this.payments = event.ev_data.recs;
        this.page_num = event.ev_data.page_num;
        this.total_page = event.ev_data.total_page;
        this.payments.forEach(item => {
          if (item.is_remitted == 1) {
                item.is_remitted = 'Remitted';

          } else {
            item.is_remitted = 'Not Remitted';

          }
        });
        this.payments.forEach(item => {
          const a = new Date(item.start_time * 1000);
          item.start_time = a.toLocaleString();
          return item.start_time;
         });
         this.payments.forEach(item => {
          const a = new Date(item.end_time * 1000);
          item.end_time = a.toLocaleString();
          return item.end_time;
         });
         this.payments.forEach(item => {
          item.pay_in_cent = item.pay_in_cent / 100;
          item.comm_in_cent = item.comm_in_cent / 100;
          item.amount_in_cent = item.amount_in_cent / 100;
        });
      }
    );
    setTimeout(() => {
      this.getNumber();
    }, 2000);
    console.log(this.pageNumArray);
  }
  setSettlement(item) {
    item.pay_in_cent = item.pay_in_cent * 100;
    item.comm_in_cent = item.comm_in_cent * 100;
    this.appService.setSettlement(item).subscribe(
      event => {
        console.log(event);
      }
    );
    setTimeout(() => {
      this.getMerchants();
    }, 2000);
  }

}
