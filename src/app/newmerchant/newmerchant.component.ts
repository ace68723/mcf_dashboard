import { CompanyService } from './../service/company.service';
import { Component, OnChanges, SimpleChanges, Input, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../js/script-loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-newmerchant',
  templateUrl: './newmerchant.component.html'
})

export class NewmerchantComponent implements OnInit, AfterViewInit {
  page_num: number;
  companyInfo: any = [];
  page_size: number;
  total_page: number;
  constructor(private _script: ScriptLoaderService, private appService: AppService, private cpyService: CompanyService,
    public route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
   this.getMerchants();
  }
  ngAfterViewInit() {

  }
  goToNextPage() {
    this.page_num = this.page_num + 1;
    this.getMerchants();
  }
  goToPreviousPage() {
    this.page_num = this.page_num - 1;
    this.getMerchants();
  }
  saveAccountID(item) {
    console.log(item);
    localStorage.setItem('account_id', item.account_id);
    localStorage.setItem('merchantname', item.display_name);
    localStorage.setItem('merchantID', item.merchant_id);
    this.router.navigate(['merchant']);
  }
  getMerchants() {
    this.cpyService.getMerchants(this.page_num).subscribe(
      event => {
        this.companyInfo = event.ev_data.recs;
        this.page_num = event.ev_data.page_num;
        this.total_page = event.ev_data.total_page;
      }
    );
  }

}
