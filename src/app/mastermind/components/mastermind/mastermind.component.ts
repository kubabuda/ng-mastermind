import { Component, OnInit } from '@angular/core';
import { RoundModel, IRoundModel, IMastermindCheck } from '../../models/round.model';
import { RoundModelView, IRoundModelView } from '../../models/round.view.model';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  roundModelViews: IRoundModelView[];
  lastRound: IRoundModel;

  private round = 0;

  constructor() {
  }

  ngOnInit() {
    this.restartGame();

  }

  incrementWhite(): void {
    this.lastRound.whitePts += 1;
    this.updateLastRoundView();
  }

  incrementBlack(): void {
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
    this.roundModelViews = [];
    this.lastRound = this.getNextRound();
    this.cleanScore();
  }

  getNextRound(): IRoundModel {
    console.log('Get next round');
    return new RoundModel(this.getNextGuess(this.lastRound));
  }

  getNextGuess(prevRoundCheck: IMastermindCheck): string {
    // todo move to solver service
    const answers = [ '11122', '12345', '23456', '34567', '12322' ]; 
    let result = '';
    if (this.round > 0) {
      result = answers[this.round % this.lastRound.answer.length];
    } else {
      result = answers[this.round];
    }
    console.log(`${this.round} next guess is ${result}`);
    ++this.round;

    return result;
  }
}
