import { Component, OnChanges, SimpleChanges, Input, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../js/script-loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
@Component({
  selector: 'app-tables',
  templateUrl: './settlements.component.html'
})

export class SettlementComponent implements OnInit, AfterViewInit {
  settlments: any;
  page_num: number;
  page_size: number;
  total_page: number;
  pageNumArray: any = [];
  i: any;
  constructor(private _script: ScriptLoaderService, private appService: AppService) {

  }
  ngOnInit() {
   this.getTable();

  }

  ngAfterViewInit() {

  }
  getNumber() {
    return this.pageNumArray = new Array(this.total_page);

  }
  goToPage(i) {
    this.appService.getSettlements(i + 1).subscribe(
      event => {
        console.log(event);
        this.settlments = event.ev_data.recs;
        this.page_num = event.ev_data.page_num;
        this.total_page = event.ev_data.total_page;
        console.log(this.settlments);
        this.settlments.forEach(item => {
          const a = new Date(item.start_time * 1000);
          item.start_time = a.toLocaleString();
          // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          // const year = a.getFullYear();
          // const month = months[a.getMonth()];
          // const date = a.getDate();
          // const hour = a.getHours();
          // const min = a.getMinutes();
          // let sec = a.getSeconds();
          // if (sec < 10) {
          //   sec = '0' + sec;
          // }
          // item.start_time = year + ' ' + month + ' ' + date + ' ' + hour + ':' + min + ':' + sec ;
          return item.start_time;
         });
         this.settlments.forEach(item => {
          const a = new Date(item.end_time * 1000);
          item.end_time = a.toLocaleString();

          // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          // const year = a.getFullYear();
          // const month = months[a.getMonth()];
          // const date = a.getDate();
          // const hour = a.getHours();
          // const min = a.getMinutes();
          // const sec = a.getSeconds();
          // item.end_time = year + ' ' + month + ' ' + date + ' ' + hour + ':' + min + ':' + sec ;
          return item.end_time;
         });
      }
    );
  }
  getTable() {
    this.appService.getSettlements(this.page_num).subscribe(
      event => {
        console.log(event);
        this.settlments = event.ev_data.recs;
        this.page_num = event.ev_data.page_num;
        this.total_page = event.ev_data.total_page;
        console.log(this.settlments);
        this.settlments.forEach(item => {
          const a = new Date(item.start_time * 1000);
          item.start_time = a.toLocaleString();
          // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          // const year = a.getFullYear();
          // const month = months[a.getMonth()];
          // const date = a.getDate();
          // const hour = a.getHours();
          // const min = a.getMinutes();
          // let sec = a.getSeconds();
          // if (sec < 10) {
          //   sec = '0' + sec;
          // }
          // item.start_time = year + ' ' + month + ' ' + date + ' ' + hour + ':' + min + ':' + sec ;
          return item.start_time;
         });
         this.settlments.forEach(item => {
          const a = new Date(item.end_time * 1000);
          item.end_time = a.toLocaleString();

          // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          // const year = a.getFullYear();
          // const month = months[a.getMonth()];
          // const date = a.getDate();
          // const hour = a.getHours();
          // const min = a.getMinutes();
          // const sec = a.getSeconds();
          // item.end_time = year + ' ' + month + ' ' + date + ' ' + hour + ':' + min + ':' + sec ;
          return item.end_time;
         });
      }
    );
    setTimeout(() => {
      this.getNumber();
    }, 2000);
    console.log(this.pageNumArray);
  }
  addSettlement(item) {
    this.appService.addSettlement(item).subscribe(
      event => {
        console.log(event);
      }
    );
    this.getTable();
  }

}
