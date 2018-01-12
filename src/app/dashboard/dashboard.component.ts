import { CompanyService } from './../service/company.service';
import { Component, OnChanges, SimpleChanges, Input, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../js/script-loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, AfterViewInit {
  page_num: number;
  new_merchant_id: any;
  companyInfo: any = [];
  pageNumArray: any = [];
  page_size: number;
  newUser: any = false;
  i: any;
  deleteItem: any;
  total_page: number;
  message: any = false;
  dataloded: any = false;
  constructor(private _script: ScriptLoaderService, private appService: AppService, private cpyService: CompanyService,
    public route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
   this.getMerchants();
  }
  ngAfterViewInit() {

  }

  getNumber() {
    return this.pageNumArray = new Array(this.total_page);

  }
  goToPage(i) {
    this.cpyService.getMerchants(i + 1).subscribe(
      event => {
        this.companyInfo = event.ev_data.recs;

      }
    );
  }
  addNewMerchant() {
    this.cpyService.addNewMerchant(this.new_merchant_id).subscribe(
      event => {
          this.message = true;
      },
      event => {
        console.log(event.json());
        alert('Duplicate MerchantID. Please check again or contact customer service');
      }
    );
    setTimeout(() => {
      this.getMerchants();
    }, 2000);
  }
  saveAccountID(item) {
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
        this.dataloded = true;
      }
    );
    setTimeout(() => {
      this.getNumber();
    }, 2000);
    console.log(this.pageNumArray);
  }
  deleteMerchant(item) {
    this.deleteItem = item;
  }
  setMerchant() {
    const item = this.deleteItem;
    item.is_deleted = 1;
    this.cpyService.setMerchant(item).subscribe(
      event => {
        console.log(event);
      }
    );
    setTimeout(() => {
      this.getMerchants();
    }, 2000);
  }
}

