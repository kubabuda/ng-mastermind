import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MastermindModule } from './mastermind/mastermind.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MastermindModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
