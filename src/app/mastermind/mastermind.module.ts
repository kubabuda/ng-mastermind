import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { NgcFloatButtonModule } from 'ngc-float-button';
import { MastermindComponent } from './components/mastermind/mastermind.component';
import { MastermindDeluxeComponent } from './components/mastermind-deluxe/mastermind-deluxe.component';
import { RoundStateComponent } from './components/round-state/round-state.component';
import { MastermindCheckVerifyService } from './services/mastermind-check-verify.service';
import { SwaszekSolverService } from './services/solvers/swaszek-solver.service';
import { MastermindGameService } from './services/mastermind-game.service';

@NgModule({
  declarations: [
    MastermindComponent,
    MastermindDeluxeComponent,
    RoundStateComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    NgcFloatButtonModule
  ],
  providers: [
    MastermindCheckVerifyService,
    MastermindGameService,
    SwaszekSolverService,
  ]
})
export class MastermindModule { }
