import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { RoundModelView, IRoundModelView } from '../../models/round.view.model';
import { IGameSettings, GameSettings } from '../../models/game.settings.model';
import { MastermindCheckVerifyService } from '../../services/mastermind-check-verify.service';
import { MastermindGameService } from '../../services/mastermind-game.service';
import { IMastermindAnswerCheck } from '../../models/answer-check.model';


@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  roundModelViews: IRoundModelView[];
  protected settings: IGameSettings;

  constructor(
    private snackBar: MatSnackBar,
    private checkVerifyService: MastermindCheckVerifyService,
    protected game: MastermindGameService) {
    this.settings = new GameSettings(5, 8);
  }

  ngOnInit() {
    this.startNewGame();
  }

  currentRoundCheck(): IMastermindAnswerCheck {
    return this.game.currentRound;
  }

  incrementWhite(): void {
    if (this.checkVerifyService.IsWhitePtsIncrementable(this.currentRoundCheck(), this.settings)) {
      this.game.currentRound.whitePts += 1;
      this.updateLastRoundView();
    }
  }

  incrementBlack(): void {
    if (this.checkVerifyService.IsBlackPtsIncrementable(this.currentRoundCheck(), this.settings)) {
      this.game.currentRound.blackPts += 1;
      this.updateLastRoundView();
    }
  }

  cleanScore(): void {
    this.game.currentRound.whitePts = 0;
    this.game.currentRound.blackPts = 0;
    this.updateLastRoundView();
  }

  checkScore(): void {
    if (this.game.isGameWon(this.currentRoundCheck())) {
      this.snackbarNotify(`Win in ${this.game.roundNo} rounds, nice`);
      this.startNewGame();
    } else {
      try {
        this.startNextRound();
        this.roundModelViews.push(this.getCurrentRoundView());
      } catch (error) {
        this.snackbarNotify(`This looks impossible. Type checks again`);
        this.startNewGame();
      }
    }
    this.updateLastRoundView();
  }

  private snackbarNotify(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }

  startNewGame() {
    this.game.newGame(this.settings);
    this.roundModelViews = [];
    this.cleanScore();
  }

  startNextRound() {
    this.game.currentRound = this.game.getNextRound(this.game.currentRound);
  }

  private updateLastRoundView() {
    this.roundModelViews.pop();
    this.roundModelViews.push(this.getCurrentRoundView());
  }

  private getCurrentRoundView(): IRoundModelView {
    return new RoundModelView(this.game.currentRound);
  }
}
