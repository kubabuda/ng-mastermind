import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcFloatButtonModule } from 'ngc-float-button';
import { MastermindComponent } from './components/mastermind/mastermind.component';
import { RoundStateComponent } from './components/round-state/round-state.component';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [MastermindComponent, RoundStateComponent ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    NgcFloatButtonModule
  ],
})
export class MastermindModule { }
