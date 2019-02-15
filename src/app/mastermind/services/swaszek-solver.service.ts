import { Injectable } from '@angular/core';
import { GameSettings } from '../models/game.settings.model';
import { IMastermindAnswerCheck, MastermindAnswerCheck, IRoundModel } from '../models/round.model';
import { error } from 'util';

export interface ISolveMastermind {
  getNextGuess(prevRoundCheck: IRoundModel): string;
}


@Injectable({
  providedIn: 'root'
})
export class SwaszekSolverService implements ISolveMastermind  {
  round: number;
  keys: Array<string>;

  constructor(private settings: GameSettings) {
    this.round = 0;
    this.keys = this.getKeysRange(this.settings.digits, settings.colors);
  }

  getNextGuess(prevRoundCheck: IRoundModel): string {
    ++this.round;
    let result = '';
    if (this.round === 1) {
      result = this.getInitialGuess();
    } else {
      this.keys = this.prunedKeys(this.keys, prevRoundCheck);
      if (this.keys !== null && this.keys !== [] && this.keys.length > 0) {
        result = this.keys[0];
      } else {
        throw new error('No keys left in solver!');
      }
    }

    return result;
  }

  getInitialGuess(): string {
    let result = '';
    // let i = this.gameSettings.colors;
    for (let digit = 1; digit <= this.settings.digits; digit++) {
      result = `${this.settings.colors - digit}${result}`;
    }

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

  checkAnswer(answer1: string, answer2: string): IMastermindAnswerCheck {

    if (answer1.length !== answer2.length) {
      throw new error('Answers lengths are different!');
    }
    let white = 0;
    let black = 0;
    const diff1 = [];
    const diff2 = [];

    for (let i = 0; i < answer1.length; i++) {
      if (answer1.charAt(i) === (answer2.charAt(i))) {
        ++white;
      } else {
        diff1.push(answer1.charAt(i));
        diff2.push(answer2.charAt(i));
      }
    }

    diff1.forEach(element => {
      const j = diff2.indexOf(element);
      if (j > -1) {
        ++black;
        diff2.splice(j, 1);
      }
    });

    return new MastermindAnswerCheck(white, black);
  }

  isAnswerCheckResultEqual(answer1: string, answer2: string, check: IMastermindAnswerCheck): boolean {
    const newCheck = this.checkAnswer(answer1, answer2);
    const result = newCheck.blackPts === check.blackPts && newCheck.whitePts === check.whitePts;

    return result;
  }

  prunedKeys(keys: string[], check: IRoundModel): string[] {
    const result = [];

    keys.forEach(key => {
      if (this.isAnswerCheckResultEqual(key, check.answer, check)) {
        result.push(key);
      }
    });

    return result;
  }
}
