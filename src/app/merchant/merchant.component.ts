import { CompanyService } from './../service/company.service';
import { Component, OnChanges, SimpleChanges, Input, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../js/script-loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html'
})

export class MerchantComponent implements OnInit, AfterViewInit {
  page_num: number;
  category: any;
  companyInfo: any = [];
  newUserInfo: any = [];
  newDeviceInfo: any = [];
  pageNumArray: any = [];
  newAliInfo: any = [];
  newWXInfo: any = [];
  page_size: number;
  account_id: any;
  total_page: number;
  merchantInfo: any;
  userInfo: any;
  deviceInfo: any;
  aliInfo: any = [];
  alic: any = false;
  wxc: any = false;
  newUser: any = false;
  i: any;
  wxInfo: any = [];
  contractInfo: any;
  merchantName: any;
  editing: any = false;
  dataLoded: any = false;
  dataLoded1: any = false;
  editing2: any = false;
  editing3: any = false;
  ali: any = false;
  wx: any = false;
  merchant_id: any;
  password: any;
  message: any = false;
  constructor(private _script: ScriptLoaderService, private appService: AppService, private cpyService: CompanyService) {

  }
  ngOnInit() {
      this.account_id = localStorage.getItem('account_id');
      this.merchantName = localStorage.getItem('merchantname');
      this.merchant_id = localStorage.getItem('merchantID');
      console.log(this.merchantName);
      this.setCategoryToBasic();
  }
  ngAfterViewInit() {

  }
// init
  setCategoryToBasic() {
      this.category = 'basic';
      this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
        event => {
          this.merchantInfo = event.ev_data;
          console.log(this.merchantInfo);
          this.dataLoded = true;
        }
      );
  }
  setCategoryToUser() {
    this.category = 'user';
    this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
      event => {
        this.merchant_id = event.ev_data.recs[0].merchant_id;
        this.userInfo = event.ev_data.recs;
        console.log(this.userInfo);
        this.total_page = event.ev_data.total_page;
      }
    );
    setTimeout(() => {
      this.getNumber();
    }, 2000);
  }
  setCategoryToDevice() {
    this.category = 'device';
    this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
      event => {
        this.deviceInfo = event.ev_data.recs;
        console.log(this.deviceInfo);
        this.total_page = event.ev_data.total_page;
      }
    );
    setTimeout(() => {
      this.getNumber();
    }, 2000);
  }
  setCategoryToChannel() {
    this.aliInfo = [];
    this.wxInfo = [];
    this.category = 'channel';
    this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
      event => {
        console.log(event);
        if (event.ev_data.ali) {
          this.aliInfo.push(event.ev_data.ali);
          this.ali = true;
        }
        if (event.ev_data.wx) {
          this.wxInfo.push(event.ev_data.wx);
          this.wx = true;
        }
      }
    );
  }
  setCategoryToContract() {
    this.category = 'contract';
    this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
      event => {
        this.contractInfo = event.ev_data;
        console.log(this.contractInfo);
        this.dataLoded1 = true;
    }
    );
  }

// init end

// editing
  startEditingWX(item) {
    item.isEditing = true;
    this.editing3 = true;
  }
  startEditingAli(item) {
    item.isEditing = true;
    this.editing2 = true;
  }
  startEditing(item) {
    if (!item.isEditing) {
      item.isEditing = true;
      this.editing2 = true;
    }
  }
  cancelEditing(item) {
      item.isEditing = false;
      this.editing2 = false;
      this.editing3 = false;
  }
// editing end
// save
  saveEditingUser(item) {
    item.is_deleted = 0;
    this.cpyService.setMerchantUser(item).subscribe(
      event => {
        if (event.ev_error == 0) {
          item.password = event.ev_data;
          item.isEditing = false;
          this.editing2 = false;
        } else {
          this.setCategoryToUser();
          item.isEditing = false;
          this.editing2 = false;
        }
      }
    );

  }
  saveCategoryBasic() {
    this.cpyService.setMerchantInfo(this.merchantInfo).subscribe(
      event => {
        console.log(event);
      }
    );
    setTimeout(() => {
     this.setCategoryToBasic();
    }, 2000);
  }
  saveCategoryContract() {
    this.cpyService.setMerchantContract(this.contractInfo).subscribe(
      event => {
        console.log(event);
      }
    );
    setTimeout(() => {
     this.setCategoryToContract();
    }, 2000);
  }
  saveEditingDevice(item) {
    this.cpyService.setMerchantDevice(item).subscribe(
      event => {
        console.log(event);
        item.isEditing = false;
        this.editing2 = false;
      }
    );
    setTimeout(() => {
     this.setCategoryToDevice();
    }, 2000);
  }

  saveEditingAli(item) {
    item.channel = 'ali';
    item.account_id = localStorage.getItem('account_id');
    this.cpyService.setMerchantChannel(item).subscribe(
      event => {
        console.log(event);
        item.isEditing = false;
        this.editing2 = false;
        this.editing3 = false;
      }
    );
    setTimeout(() => {
     this.setCategoryToChannel();
    }, 2000);
  }
  saveEditingWX(item) {
    item.channel = 'wx';
    item.account_id = localStorage.getItem('account_id');
    console.log(item);
    this.cpyService.setMerchantChannel(item).subscribe(
      event => {
        console.log(event);
        item.isEditing = false;
        this.editing2 = false;
        this.editing3 = false;
      }
    );
    setTimeout(() => {
     this.setCategoryToChannel();
    }, 2000);
  }
// save end
// new
  addNewUser() {
    this.newUserInfo = [];
    this.newUserInfo.push({});
  }
  saveNewUser(item) {
    item.account_id = this.account_id;
    this.cpyService.addNewUser(item).subscribe(
      event => {
        this.password = event.ev_data;
        if (event.ev_error == 0) {
          this.message = true;
        }
      }
    );
    setTimeout(() => {
      this.setCategoryToUser();
    }, 2000);
  }
  addNewDevice() {
    this.newDeviceInfo = [];
    this.newDeviceInfo.push({});
  }
  saveNewDevice(item) {
    item.account_id = this.account_id;
    this.cpyService.addNewDevice(item).subscribe(
      event => {
        if (event.ev_error == 0) {
          this.message = true;
        }
      }
    );
    setTimeout(() => {
      this.setCategoryToDevice();
    }, 2000);
  }
  addNewAliChannel() {
    this.newAliInfo = [];
    this.newAliInfo.push({});
  }
  addNewWXChannel() {
    this.newWXInfo = [];
    this.newWXInfo.push({});
  }
  saveNewAli(item) {
    item.channel = 'ali';
    item.account_id = localStorage.getItem('account_id');
    this.cpyService.setMerchantChannel(item).subscribe(
      event => {
        if (event.ev_error == 0) {
          this.message = true;
        }
      }
    );
    setTimeout(() => {
      this.setCategoryToChannel();
    }, 2000);
  }
  saveNewWX(item) {
    item.channel = 'wx';
    item.account_id = localStorage.getItem('account_id');
    this.cpyService.setMerchantChannel(item).subscribe(
      event => {
        if (event.ev_error == 0) {
          this.message = true;
        }
      }
    );
    setTimeout(() => {
      this.setCategoryToChannel();
    }, 2000);
  }
// new end
  goToPage(i) {
    if (this.category == 'user') {
      this.page_num = i + 1;
      this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
        event => {
          this.merchant_id = event.ev_data.recs[0].merchant_id;
          this.userInfo = event.ev_data.recs;
          console.log(this.userInfo);
          this.total_page = event.ev_data.total_page;
        }
      );
    } else if ( this.category == 'device') {
      this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
        event => {
          this.deviceInfo = event.ev_data.recs;
          console.log(this.deviceInfo);
          this.total_page = event.ev_data.total_page;
        }
      );
    }
  }
  getNumber() {
    return this.pageNumArray = new Array(this.total_page);

  }
  deleteDevice(item) {
    item.is_deleted = 1;
    this.cpyService.setMerchantDevice(item).subscribe(
      event => {
        console.log(event);
        item.isEditing = false;
        this.editing2 = false;
      }
    );
    setTimeout(() => {
      this.setCategoryToDevice();
    }, 2000);
  }
  deleteUser(item) {
    item.is_deleted = 1;
    this.cpyService.setMerchantUser(item).subscribe(
      event => {
        console.log(event);
        item.isEditing = false;
        this.editing2 = false;
      }
    );
    setTimeout(() => {
    this.setCategoryToUser();
    }, 2000);
  }
}
