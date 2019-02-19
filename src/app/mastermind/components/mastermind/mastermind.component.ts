import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { RoundModel, IRoundModel, IMastermindAnswerCheck } from '../../models/round.model';
import { RoundModelView, IRoundModelView } from '../../models/round.view.model';
import { ISolveMastermind, SwaszekSolverService } from '../../services/swaszek-solver.service';
import { IGameSettings, GameSettings } from '../../models/game.settings.model';
import { MastermindCheckVerifyService } from '../../services/mastermind-check-verify.service';


export interface IMastermindGame {
  currentRound: IRoundModel;
  newGame(settings: IGameSettings): void;
  isGameWon(roundCheck: IMastermindAnswerCheck): boolean;
}

// export class MastermindGame implements IMastermindGame {

// }

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  roundModelViews: IRoundModelView[];
  currentRound: IRoundModel;

  round = 0;
  private settings: IGameSettings;
  private solver: ISolveMastermind;

  constructor(
    private snackBar: MatSnackBar,
    private checkVerifyService: MastermindCheckVerifyService) {
    this.settings = new GameSettings(5, 8);
  }

  ngOnInit() {
    this.startNewGame();
  }

  newGame(settings: IGameSettings): void {
    this.round = 0;
    this.solver = new SwaszekSolverService(settings);
    this.roundModelViews = [];
    this.currentRound = this.getNextRound(this.currentRound);
    this.cleanScore();
  }

  getNextRound(check: IMastermindAnswerCheck): IRoundModel {
    this.round += 1;
    const nextAnswer = this.solver.getNextGuess(check);

    return new RoundModel(nextAnswer);
  }

  isGameWon(roundCheck: IMastermindAnswerCheck): boolean {
    if (this.checkVerifyService.IsGameWon(roundCheck, this.settings)) {
      this.newGame(this.settings);

      return true;
    } else {
      this.startNextRound();

      return false;
    }
  }

  // methods exposed to template

  incrementWhite(): void {
    if (this.checkVerifyService.IsWhitePtsIncrementable(this.currentRound, this.settings)) {
      this.currentRound.whitePts += 1;
      this.updateLastRoundView();
    }
  }

  incrementBlack(): void {
    if (this.checkVerifyService.IsBlackPtsIncrementable(this.currentRound, this.settings)) {
      this.currentRound.blackPts += 1;
      this.updateLastRoundView();
    }
  }

  cleanScore(): void {
    this.currentRound.whitePts = 0;
    this.currentRound.blackPts = 0;
    this.updateLastRoundView();
  }

  checkScore(): void {
    if (this.isGameWon(this.currentRound)) {
      this.snackBar.open(` WIN IN ${this.round} ROUNDS, NICE`, 'OK', {
        duration: 5000,
      });
    } else {
      this.roundModelViews.push(this.getCurrentRoundView());
    }
    this.updateLastRoundView();
  }

  startNewGame() {
    this.newGame(this.settings);
  }

  startNextRound() {
    this.currentRound = this.getNextRound(this.currentRound);
  }

  private updateLastRoundView() {
    this.roundModelViews.pop();
    this.roundModelViews.push(this.getCurrentRoundView());
  }

  private getCurrentRoundView(): IRoundModelView {
    return new RoundModelView(this.currentRound);
  }
}
