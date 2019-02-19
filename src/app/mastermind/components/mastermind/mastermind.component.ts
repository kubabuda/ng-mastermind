import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { RoundModel, IRoundModel, IMastermindAnswerCheck } from '../../models/round.model';
import { RoundModelView, IRoundModelView } from '../../models/round.view.model';
import { ISolveMastermind, SwaszekSolverService } from '../../services/swaszek-solver.service';
import { IGameSettings, GameSettings } from '../../models/game.settings.model';
import { MastermindCheckVerifyService } from '../../services/mastermind-check-verify.service';


export interface IMastermindGame {
  currentRound: IRoundModel;
  roundNo: number;
  newGame(settings: IGameSettings): void;
  getNextRound(check: IMastermindAnswerCheck): IRoundModel;
  isGameWon(roundCheck: IMastermindAnswerCheck): boolean;
}

// TODO move to service (specs too)
export class MastermindGame implements IMastermindGame {
  currentRound: IRoundModel;
  // currentRoundCheck: IRoundModel;
  roundNo = 0;
  private settings: IGameSettings;
  private solver: ISolveMastermind;

  constructor(private checkVerifyService: MastermindCheckVerifyService) { }

  newGame(settings: IGameSettings): void {
    this.settings = settings;
    this.roundNo = 0;
    this.solver = new SwaszekSolverService(settings);
    this.currentRound = this.getNextRound(this.currentRound); // round is null here but first value is ignored
  }

  getNextRound(check: IMastermindAnswerCheck): IRoundModel {
    this.roundNo += 1;
    const nextAnswer = this.solver.getNextGuess(check);

    return new RoundModel(nextAnswer); // TODO split to take separate check and answer
  }

  isGameWon(roundCheck: IMastermindAnswerCheck): boolean {
    if (this.checkVerifyService.IsGameWon(roundCheck, this.settings)) {
      return true;
    } else {
      return false;
    }
  }
}

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  roundModelViews: IRoundModelView[];
  game: IMastermindGame;
  // currentRoundCheck: IRoundModel;
  private settings: IGameSettings;

  constructor(
    private snackBar: MatSnackBar,
    private checkVerifyService: MastermindCheckVerifyService) {
    this.settings = new GameSettings(5, 8);
    this.game = new MastermindGame(checkVerifyService);
  }

  ngOnInit() {
    this.startNewGame();
  }

  incrementWhite(): void {
    if (this.checkVerifyService.IsWhitePtsIncrementable(this.game.currentRound, this.settings)) {
      this.game.currentRound.whitePts += 1;
      this.updateLastRoundView();
    }
  }

  incrementBlack(): void {
    if (this.checkVerifyService.IsBlackPtsIncrementable(this.game.currentRound, this.settings)) {
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
    if (this.game.isGameWon(this.game.currentRound)) {
      this.snackBar.open(` WIN IN ${this.game.roundNo} ROUNDS, NICE`, 'OK', {
        duration: 5000,
      });
      this.startNewGame();
    } else {
      this.startNextRound();
      this.roundModelViews.push(this.getCurrentRoundView());
    }
    this.updateLastRoundView();
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
