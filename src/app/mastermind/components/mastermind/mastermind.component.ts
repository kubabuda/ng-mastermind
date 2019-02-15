import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { RoundModel, IRoundModel, IMastermindAnswerCheck } from '../../models/round.model';
import { RoundModelView, IRoundModelView } from '../../models/round.view.model';
import { ISolveMastermind, SwaszekSolverService } from '../../services/swaszek-solver.service';
import { IGameSettings, GameSettings } from '../../models/game.settings.model';


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

  constructor(private snackBar: MatSnackBar) {
    this.settings = new GameSettings(5, 8);
  }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.round = 0;
    this.solver = new SwaszekSolverService(this.settings);
    this.roundModelViews = [];
    this.currentRound = this.getNextRound();
    this.cleanScore();
  }

  incrementWhite(): void {
    if (this.IsWhitePtsIncrementable(this.currentRound, this.settings)) {
      this.currentRound.whitePts += 1;
      this.updateLastRoundView();
    }
  }

  incrementBlack(): void {
    if (this.IsBlackPtsIncrementable(this.currentRound, this.settings)) {
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
    if (this.currentRound.whitePts === this.settings.digits) {
      this.snackBar.open(` WIN IN ${this.round} ROUNDS, NICE`, 'OK', {
        duration: 5000,
      });
      this.newGame();
    } else {
      this.roundModelViews.push(this.getCurrentRoundView());
      this.currentRound = this.getNextRound();
      this.updateLastRoundView();
    }
  }

  private getCurrentRoundView(): IRoundModelView {
    return new RoundModelView(this.currentRound);
  }

  private updateLastRoundView() {
    this.roundModelViews.pop();
    this.roundModelViews.push(this.getCurrentRoundView());
  }

  getNextRound(): IRoundModel {
    ++this.round;
    return new RoundModel(this.solver.getNextGuess(this.currentRound));
  }

  public IsWhitePtsIncrementable(check: IMastermindAnswerCheck, settings: IGameSettings): boolean {
    if (check.whitePts + check.blackPts === settings.digits) {
        return false;
    }
    return true;
  }

  public IsBlackPtsIncrementable(check: IMastermindAnswerCheck, settings: IGameSettings): boolean {
    if (check.whitePts + check.blackPts === settings.digits
      || check.whitePts + 1 === settings.digits) {
        return false;
    }
    return true;
  }
}
