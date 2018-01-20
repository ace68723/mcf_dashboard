import { CompanyService } from './../service/company.service';
import { Component, OnChanges, SimpleChanges, Input, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../js/script-loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [`
    .some-class {
      background-color:#ffb822;
      color:white !important;
    }
  `],
})

export class OrdersComponent implements OnInit, AfterViewInit {
  page_num: number;
  companyInfo: any = [];
  pageNumArray: any = [];
  page_size: number;
  i: any;
  keyword: any;
  total_page: number;
  dataloded: any = false;
  constructor(private _script: ScriptLoaderService, private appService: AppService, private cpyService: CompanyService,
    public route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
   this.getMerchants();
   console.log(this.pageNumArray);
  }
  ngAfterViewInit() {

  }
  console(i) {
    console.log(i);
  }
  getMerchantByKeyword() {
    this.cpyService.getMerchantByKeyword(this.keyword).subscribe(
      event => {
        this.companyInfo = event.ev_data.recs;
        this.page_num = event.ev_data.page_num;
        this.total_page = event.ev_data.total_page;
        this.dataloded = true;
      },
      event => {
        if (event.ev_error === 10011) {
          alert('Your account has been logged in from another device.');
        } else if (event.ev_error === 10001) {
          alert('Token Expires. Please login again.');
        }
      }
    );
    setTimeout(() => {
      this.getNumber();
    }, 2000);
  }
  getNumber() {
    return this.pageNumArray = new Array(this.total_page);
  }
  goToPage(i) {
    this.page_num = i+1;
    this.cpyService.getMerchants(i + 1).subscribe(
      event => {
        this.companyInfo = event.ev_data.recs;

      }
    );
  }
  goToBills(item) {
    this.router.navigate(['transaction']);
    localStorage.setItem('account_id', item.account_id);
    localStorage.setItem('merchantname', item.display_name);
    localStorage.setItem('merchantID', item.merchant_id);
  }
  getMerchants() {
    this.cpyService.getMerchants(this.page_num).subscribe(
      event => {
        this.companyInfo = event.ev_data.recs;
        this.page_num = event.ev_data.page_num;
        this.total_page = event.ev_data.total_page;
        this.dataloded = true;
        console.log(this.page_num);
      }
    );
    setTimeout(() => {
      this.getNumber();
    }, 2000);
    console.log(this.pageNumArray);
  }

}
