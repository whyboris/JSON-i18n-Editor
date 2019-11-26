import { Component, Input, AfterViewInit } from '@angular/core';
import { TranslationItem } from './app.component';

@Component({
  selector: 'app-row-component',
  templateUrl: './row.component.html',
  styleUrls: ['./app.component.scss',
              './row.component.scss']
})
export class RowComponent implements AfterViewInit {

  @Input() item: TranslationItem;

  constructor() { }

  ngAfterViewInit() {
    // console.log(this.item);
  }

}
