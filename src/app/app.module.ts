import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MySearchPipe } from './search.pipe';
import { PagePipe } from './page.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MySearchPipe,
    PagePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
