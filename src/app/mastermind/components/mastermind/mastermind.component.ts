import { Component, OnInit } from '@angular/core';
import { RoundModel, IRoundModel, IMastermindCheck } from '../../models/round.model';
import { RoundModelView, IRoundModelView } from '../../models/round.view.model';
import { ISolveMastermind, SwaszekSolverService } from '../../services/swaszek-solver.service';

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  roundModelViews: IRoundModelView[];
  lastRound: IRoundModel;

  private round = 0;
  private solver: ISolveMastermind;

  constructor() {
  }

  ngOnInit() {
    this.restartGame();

  }

  incrementWhite(): void {
    // todo validate
    this.lastRound.whitePts += 1;
    this.updateLastRoundView();
  }

  incrementBlack(): void {
    // todo validate
    this.lastRound.blackPts += 1;
    this.updateLastRoundView();
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
  }

  private getUpdatedLastRoundView(): IRoundModelView {
    console.log(`${this.round} getUpdatedLastRoundView\
     answer ${this.lastRound.answer} wh${this.lastRound.whitePts} black ${this.lastRound.blackPts}`);

    return new RoundModelView(this.lastRound);
  }

  private updateLastRoundView() {
    this.roundModelViews.pop();
    this.roundModelViews.push(this.getUpdatedLastRoundView());
  }

  restartGame() {
    this.round = 0;
    this.solver = new SwaszekSolverService();
    this.roundModelViews = [];
    this.lastRound = this.getNextRound();
    this.cleanScore();
  }

  getNextRound(): IRoundModel {
    console.log('Get next round');
    return new RoundModel(this.solver.getNextGuess(this.lastRound));
  }

}
