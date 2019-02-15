import { Injectable } from '@angular/core';
import { IMastermindCheck } from '../models/round.model';
import { GameSettings } from '../models/game.settings.model';

export interface ISolveMastermind {
  getNextGuess(prevRoundCheck: IMastermindCheck): string;
}


@Injectable({
  providedIn: 'root'
})
export class SwaszekSolverService implements ISolveMastermind  {
  round: number;

  constructor(settings: GameSettings) {
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
    // console.log(`${this.round} next guess is ${result}`);
    ++this.round;

    return result;
  }

  getKeysRange(digits: number, colors: number): string[] {
    const result = [];

    const rangeSize = Math.pow(colors, digits);

    for (let i = 0; i < rangeSize; i++) {
      let currKeyWord = ``;
      let c = i;
      for (let d = 0; d < digits; d++) {
        currKeyWord = `${c % colors}${currKeyWord}`;
        c = Math.floor(c / colors);
      }
      result.push(currKeyWord);
    }
    return result;
  }
}
