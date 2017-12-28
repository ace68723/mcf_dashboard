import { ScriptLoaderService } from './../../js/script-loader.service';
import { AppService } from './../app.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'
})

export class TransactionComponent implements OnInit, AfterViewInit {
    @ViewChild('ip') ip: ElementRef;
    @ViewChild('ipp') ipp: ElementRef;
    page_num: number;
    page_size: number;
    total_page: number;
    categories: any;
    merchantname: any;
    status: any;
    i: any;
    time: any = [
    ];
    account_id: any;
    displaytime: any = [];
    pageNumArray: any = [];
    constructor(private _script: ScriptLoaderService, private appService: AppService) {

    }
    ngOnInit() {
      this.account_id = localStorage.getItem('account_id');
      this.merchantname = localStorage.getItem('merchantname');
      this.getTable();
      console.log(this.account_id);
    }

    ngAfterViewInit() {
        this._script.load('app-transaction',
        'assets/bootstrap-datepicker.js');
    }
    getNumber() {
      return this.pageNumArray = new Array(this.total_page);
    }
    goToPage(i) {
      this.page_num = i + 1;
      if (this.status == 'hot') {
        this.getTable();
      } else if (this.status == 'history') {
        this.getBillHistory();
      }
    }
    getTable() {
      this.appService.getTodayBill(this.page_num, this.account_id).subscribe(
        event => {
          this.categories = event.ev_data.recs;
          this.page_num = event.ev_data.page_num;
          this.total_page = event.ev_data.total_page;
          this.status = 'hot';
          console.log(this.categories);
          this.categories.forEach(item => {
            if (item.vendor_channel == "WX") {
                  item.vendor_channel = '微信支付';
            } else {
              item.vendor_channel = '支付宝';
            }
          });
          this.categories.forEach(item => {
            const a = new Date(item.time * 1000);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const year = a.getFullYear();
            const month = months[a.getMonth()];
            const date = a.getDate();
            const hour = a.getHours();
            const min = a.getMinutes();
            const sec = a.getSeconds();
            item.time = year + ' ' + month + ' ' + date + ' ' + hour + ':' + min + ':' + sec ;
            return item.time;
          });
          this.categories.forEach(item => {
            if (item.is_refund == true) {
                  item.is_refund = '退款';
            } else {
              item.is_refund = '付款';
            }
          });
        }
      );
      setTimeout(() => {
        this.getNumber();
      }, 2000);
      console.log(this.pageNumArray);
    }
    getBillHistory() {

        this.time.iv_start = this.ip.nativeElement.value;
        this.time.iv_end = this.ipp.nativeElement.value;
        console.log(this.time.iv_start);
        console.log(this.time.iv_end);
        this.displaytime.iv_start = new Date(this.time.iv_start).getTime() / 1000;
        this.displaytime.iv_end = new Date(this.time.iv_end).getTime() / 1000;

        console.log(this.displaytime.iv_start);
        console.log(this.displaytime.iv_end);
        this.appService.getBillHistory(this.displaytime, this.page_num, this.account_id).subscribe(
          event => {
            console.log(event);
            this.categories = event.ev_data.recs;
            this.page_num = event.ev_data.page_num;
            this.total_page = event.ev_data.total_page;
            this.status = 'history';
            console.log(this.categories);
            this.categories.forEach(item => {
                if (item.vendor_channel == "WX") {
                      item.vendor_channel = '微信支付';
                } else {
                  item.vendor_channel = '支付宝';
                }
              });
              this.categories.forEach(item => {
                const a = new Date(item.time * 1000);
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const year = a.getFullYear();
                const month = months[a.getMonth()];
                const date = a.getDate();
                const hour = a.getHours();
                const min = a.getMinutes();
                const sec = a.getSeconds();
                item.time = year + ' ' + month + ' ' + date + ' ' + hour + ':' + min + ':' + sec ;
                return item.time;
              });
              this.categories.forEach(item => {
                if (item.is_refund == true) {
                      item.is_refund = '退款';
                } else {
                  item.is_refund = '付款';
                }
              });
          }
        );
        setTimeout(() => {
          this.getNumber();
        }, 2000);
        console.log(this.pageNumArray);
      }
    convertTime(time) {
        Math.round(new Date('time').getTime() / 1000);
    }
}
