import { Component, OnInit } from '@angular/core';
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
  lastRound: IRoundModel;

  round = 0;
  private settings: IGameSettings;
  private solver: ISolveMastermind;

  constructor() {
    this.settings = new GameSettings(5, 8);
  }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.round = 0;
    this.solver = new SwaszekSolverService(this.settings);
    this.roundModelViews = [];
    this.lastRound = this.getNextRound();
    this.cleanScore();
  }

  incrementWhite(): void {
    if (this.IsWhitePtsIncrementable(this.lastRound, this.settings)) {
      this.lastRound.whitePts += 1;
      this.updateLastRoundView();
    }
  }

  incrementBlack(): void {
    if (this.IsBlackPtsIncrementable(this.lastRound, this.settings)) {
      this.lastRound.blackPts += 1;
      this.updateLastRoundView();
    }
  }

  cleanScore(): void {
    this.lastRound.whitePts = 0;
    this.lastRound.blackPts = 0;
    this.updateLastRoundView();
  }

  checkScore(): void {
    this.roundModelViews.push(this.getUpdatedLastRoundView());
    this.lastRound = this.getNextRound();
    this.updateLastRoundView();
    // todo check if win, if yes:
    // let snackBarRef = snackBar.open('Bravo', 'OK');
    // newGame()
  }

  private getUpdatedLastRoundView(): IRoundModelView {
    return new RoundModelView(this.lastRound);
  }

  private updateLastRoundView() {
    this.roundModelViews.pop();
    this.roundModelViews.push(this.getUpdatedLastRoundView());
  }

  getNextRound(): IRoundModel {
    ++this.round;
    return new RoundModel(this.solver.getNextGuess(this.lastRound));
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
