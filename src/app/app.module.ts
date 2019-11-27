import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';

import { FileService } from './file.service';
import { HelperService } from './quill/quill.service';

import { AppComponent } from './app.component';
import { RowComponent } from './row/row.component';

import { MySearchPipe } from './pipes/search.pipe';
import { PagePipe } from './pipes/page.pipe';
import { ShowOncePipe } from './pipes/show-once.pipe';
import { ViewPipe } from './pipes/view.pipe';

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
    HttpClientModule,
    VirtualScrollerModule,
  ],
  providers: [
    FileService,
    HelperService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
