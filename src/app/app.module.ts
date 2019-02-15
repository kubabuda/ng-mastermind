import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MastermindModule } from './mastermind/mastermind.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MastermindModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class AppModule { }
