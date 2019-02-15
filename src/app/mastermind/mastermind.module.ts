import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastermindComponent } from './components/mastermind/mastermind.component';
import { RoundStateComponent } from './components/round-state/round-state.component';

@NgModule({
  declarations: [MastermindComponent, RoundStateComponent],
  imports: [
    CommonModule
  ]
})
export class MastermindModule { }
