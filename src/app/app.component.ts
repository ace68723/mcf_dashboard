import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
   .app-root: {height:100%}
  `]
})
export class AppComponent implements OnInit {
  title = 'app';
  boxes: any;
  constructor(private appService: AppService) {

  }
  ngOnInit() {
  }
}
