import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MySearchPipe } from './search.pipe';
import { PagePipe } from './page.pipe';
import { ShowOncePipe } from './show-once.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MySearchPipe,
    PagePipe,
    ShowOncePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
