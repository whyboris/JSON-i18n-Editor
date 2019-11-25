import { Component } from '@angular/core';

const en: any = require('../assets/en.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data = en;

  context: string[];

  constructor() {
    console.log(en);
    console.log(en.how);
  }

  getKeys(anyObj) {
    return Object.keys(anyObj);
  }


}
