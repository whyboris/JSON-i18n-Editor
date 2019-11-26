import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';

import { HelperService } from './helper.service';

import { AppComponent } from './app.component';
import { RowComponent } from './row.component';

import { MySearchPipe } from './search.pipe';
import { PagePipe } from './page.pipe';
import { ShowOncePipe } from './show-once.pipe';
import { ViewPipe } from './view.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MySearchPipe,
    PagePipe,
    RowComponent,
    ShowOncePipe,
    ViewPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    VirtualScrollerModule,
  ],
  providers: [
    HelperService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
