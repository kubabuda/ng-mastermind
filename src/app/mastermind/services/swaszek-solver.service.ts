import { Injectable } from '@angular/core';
import { IMastermindCheck } from '../models/round.model';

export interface ISolveMastermind {
  getNextGuess(prevRoundCheck: IMastermindCheck): string;
}


@Injectable({
  providedIn: 'root'
})
export class SwaszekSolverService implements ISolveMastermind  {
  round: number;

  constructor() {
    this.round = 0;
  }

  getNextGuess(prevRoundCheck: IMastermindCheck): string {
    // todo implement solving logic
    const answers = [ '11122', '12345', '23456', '34567', '12322' ];
    let result = '';
    if (this.round > 0) {
      result = answers[this.round % 5];
    } else {
      result = answers[this.round];
    }
    console.log(`${this.round} next guess is ${result}`);
    ++this.round;

    return result;
  }
}
