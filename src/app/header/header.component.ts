import { AppService } from './../app.service';
import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { OnInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnChanges {
  currentpath: any;
  constructor(private appService: AppService, public route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    this.currentpath = window.location.pathname;
    console.log(this.currentpath);
    if (this.currentpath == '/') {
      this.currentpath = 'Merchants';
    } else if (this.currentpath == '/order') {
      this.currentpath = 'Orders';
    } else if (this.currentpath == '/settlement') {
      this.currentpath = 'Settlement';
    } else if (this.currentpath == '/merchant') {
      this.currentpath = 'Merchant Detail';
    } else if (this.currentpath == '/payment') {
      this.currentpath = 'Remittance';
    } else if (this.currentpath == '/new') {
      this.currentpath = 'New Merchant';
    } else if (this.currentpath == '/transaction') {
      this.currentpath = 'Transaction';
    }
  }
  ngOnChanges() {
    this.currentpath = window.location.href;
    console.log(this.currentpath);
  }
  logout() {
    this.appService.logout();
    this.router.navigate(['login']);
  }
}
