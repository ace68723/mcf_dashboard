import { Component, OnInit} from '@angular/core';
import { AppService } from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(private appService: AppService, public route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
     this.is_logged();
   }
  login() {
    this.appService.login(this.model).subscribe(
      event => {
        console.log(event);
        localStorage.setItem('token', event.token);
        this.router.navigate(['']);
      }
    );
  }
  is_logged() {
    if (localStorage.getItem('token')) {
      // logged in so return true
        this.router.navigate(['']);
  }
  }
}
