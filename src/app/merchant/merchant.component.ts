import { CompanyService } from './../service/company.service';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptLoaderService } from '../../js/script-loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styles: [`
    .some-class {
      background-color:#ffb822;
      color:white !important;
    }
  `],
})

export class MerchantComponent implements OnInit, AfterViewInit {
  @ViewChild('ippp') ippp: ElementRef;
  @ViewChild('ipppp') ipppp: ElementRef;
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
  merchantInfo: any = [];
  userInfo: any;
  deviceInfo: any;
  aliInfo: any = [];
  alic: any = false;
  wxc: any = false;
  newUser: any = false;
  i: any;
  userDelete: any;
  deviceDelete: any;
  wxInfo: any = [];
  contractInfo: any = {};
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
  changeTip() {
    this.contractInfo.tip_mode = !this.contractInfo.tip_mode;
    console.log(this.contractInfo.tip_mode);
  }
  loadScript() {
    this._script.load('app-merchant',
    'assets/bootstrap-datepicker.js');
  }
  setCategoryToBasic() {
      this.category = 'basic';
      this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
        event => {
          this.merchantInfo = event.ev_data;
          console.log(this.merchantInfo);
          this.dataLoded = true;
        },
        event => {
          if (event.ev_error === 10011) {
            alert('Your account has been logged in from another device.');
          } else if (event.ev_error === 10001) {
            alert('Token Expires. Please login again.');
          }
        }
      );
  }
  setCategoryToUser() {
    this.category = 'user';
    this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
      event => {
        console.log(event);
        if (event.ev_data.recs !== []) {
          this.merchant_id = event.ev_data.recs[0].merchant_id;
          this.userInfo = event.ev_data.recs;
          console.log(this.userInfo);
          this.total_page = event.ev_data.total_page;
        }
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
  setCategoryToDevice() {
    this.category = 'device';
    this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
      event => {
        this.deviceInfo = event.ev_data.recs;
        console.log(this.deviceInfo);
        this.total_page = event.ev_data.total_page;
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
  setCategoryToChannel() {
    this.aliInfo = [];
    this.wxInfo = [];
    this.category = 'channel';
    this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
      event => {
        if (event.ev_data.ali) {
          this.aliInfo.push(event.ev_data.ali);
          this.ali = true;
          this.aliInfo.forEach(item => {
            item.rate = item.rate / 100;
          });
        }
        if (event.ev_data.wx) {
          this.wxInfo.push(event.ev_data.wx);
          this.wx = true;
          this.wxInfo.forEach(item => {
            item.rate = item.rate / 100;
          });
        }
      },
      event => {
        if (event.ev_error === 10011) {
          alert('Your account has been logged in from another device.');
        } else if (event.ev_error === 10001) {
          alert('Token Expires. Please login again.');
        }
      }
    );
  }
  setCategoryToContract() {
    this.category = 'contract';
    this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
      event => {
        this.contractInfo = event.ev_data;
        this.contractInfo.remit_min_in_cent = this.contractInfo.remit_min_in_cent / 100;
        console.log(this.contractInfo);
      },
      event => {
        if (event.ev_error === 10011) {
          alert('Your account has been logged in from another device.');
        } else if (event.ev_error === 10001) {
          alert('Token Expires. Please login again.');
        }
      }
    );
    if (this.contractInfo.tip_mode) {
      this.contractInfo.tip_mode = true;
    } else {this.contractInfo = false; }
        this.dataLoded1 = true;
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
      },
      event => {
        if (event.ev_error === 10011) {
          alert('Your account has been logged in from another device.');
        } else if (event.ev_error === 10001) {
          alert('Token Expires. Please login again.');
        }
      }
    );

  }
  saveCategoryBasic() {
    this.cpyService.setMerchantInfo(this.merchantInfo).subscribe(
      event => {
        console.log(event);
      },
      event => {
        if (event.ev_context === 'check failed:timezone, checker:[{}]') {
          alert('Miss TimeZone');
        } else if (event.ev_error === 10011) {
          alert('Your account has been logged in from another device.');
        } else if (event.ev_error === 10001) {
          alert('Token Expires. Please login again.');
        }
      }
    );
    setTimeout(() => {
     this.setCategoryToBasic();
    }, 2000);
  }
  saveCategoryContract() {
    this.contractInfo.start_date = this.ippp.nativeElement.value;
    this.contractInfo.end_date = this.ipppp.nativeElement.value;
    if (this.contractInfo.tip_mode) {
      this.contractInfo.tip_mode = 'display';
    } else {this.contractInfo.tip_mode = ''; }
    console.log(this.contractInfo);
    this.cpyService.setMerchantContract(this.contractInfo).subscribe(
      event => {
        console.log(event);
      },
      event => {
        if (event.ev_error === 10011) {
          alert('Your account has been logged in from another device.');
        } else if (event.ev_error === 10001) {
          alert('Token Expires. Please login again.');
        } else if (event.ev_context === 'check failed:device_amount, checker:["is_int"]') {
          alert('Missing Device Amount');
        }
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
        if (event.ev_error === 0) {
          this.message = true;
        }
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
        if (event.ev_error === 0) {
          this.message = true;
        }
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
        if (event.ev_error === 0) {
          this.message = true;
        }
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
      this.setCategoryToChannel();
    }, 2000);
  }
  saveNewWX(item) {
    item.channel = 'wx';
    item.account_id = localStorage.getItem('account_id');
    this.cpyService.setMerchantChannel(item).subscribe(
      event => {
        if (event.ev_error === 0) {
          this.message = true;
        }
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
      this.setCategoryToChannel();
    }, 2000);
  }
// new end
  goToPage(i) {
    this.page_num = i + 1;
    if (this.category === 'user') {
      this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
        event => {
          this.merchant_id = event.ev_data.recs[0].merchant_id;
          this.userInfo = event.ev_data.recs;
          console.log(this.userInfo);
          this.total_page = event.ev_data.total_page;
        },
        event => {
          if (event.ev_error === 10011) {
            alert('Your account has been logged in from another device.');
          } else if (event.ev_error === 10001) {
            alert('Token Expires. Please login again.');
          }
        }
      );
    } else if ( this.category === 'device') {
      this.cpyService.getMerchantInfo(this.page_num, this.category, this.account_id).subscribe(
        event => {
          this.deviceInfo = event.ev_data.recs;
          console.log(this.deviceInfo);
          this.total_page = event.ev_data.total_page;
        },
        event => {
          if (event.ev_error === 10011) {
            alert('Your account has been logged in from another device.');
          } else if (event.ev_error === 10001) {
            alert('Token Expires. Please login again.');
          }
        }
      );
    }
  }
  getNumber() {
    return this.pageNumArray = new Array(this.total_page);

  }
  setDeleteDevice(item) {
    this.deviceDelete = item;
  }
  deleteDevice() {
    const item = this.deviceDelete;
    item.is_deleted = 1;
    this.cpyService.setMerchantDevice(item).subscribe(
      event => {
        console.log(event);
        item.isEditing = false;
        this.editing2 = false;
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
      this.setCategoryToDevice();
    }, 2000);
  }
  setDeleteUser(item) {
    this.userDelete = item;
  }
  deleteUser() {
    const item = this.userDelete;
    item.is_deleted = 1;
    this.cpyService.setMerchantUser(item).subscribe(
      event => {
        console.log(event);
        item.isEditing = false;
        this.editing2 = false;
      },
      event => {
      if (event.ev_context === 'check failed:role, checker:["is_int",[101,365]]') {
          alert('Can`t Delete Manager Account');
        } else if (event.ev_context === 'possibly duplicated username.') {
          alert('Duplicate Username. Please check again.');
        } else if (event.ev_error === 10011) {
          alert('Your account has been logged in from another device.');
        } else if (event.ev_error === 10001) {
          alert('Token Expires. Please login again.');
        }
      }
    );
    setTimeout(() => {
    this.setCategoryToUser();
    }, 2000);
  }
}
