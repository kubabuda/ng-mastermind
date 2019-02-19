import { Injectable } from '@angular/core';
import { GameSettings } from '../models/game.settings.model';
import { IMastermindAnswerCheck, MastermindAnswerCheck } from '../models/round.model';
import { error } from 'util';

export interface ISolveMastermind {
  // watch out: first round check is ignored!
  getNextGuess(prevRoundCheck: IMastermindAnswerCheck): string;
  // maybe separate getFirstGuess() should be exposed?
}


@Injectable({
  providedIn: 'root'
})
export class SwaszekSolverService implements ISolveMastermind  {
  round: number;
  keys: Array<string>;
  codeGuess: string;

  constructor(private settings: GameSettings) {
    this.round = 0;
    this.keys = this.getKeysRange(this.settings.digits, settings.colors);
  }

  getNextGuess(roundCheck: IMastermindAnswerCheck): string {
    ++this.round;
    if (this.round === 1) {
      // first round check values is ignored
      this.codeGuess = this.getInitialGuess();
    } else {
      this.keys = this.prunedKeys(this.keys, this.codeGuess, roundCheck);
      if (this.keys !== null && this.keys !== [] && this.keys.length > 0) {
        this.codeGuess = this.keys[0];
      } else {
        throw new error('No keys left in solver!');
      }
    }

    return this.codeGuess;
  }

  getInitialGuess(): string {
    let result = '';
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

  prunedKeys(possibleKeys: string[], keyGuess: string, check: IMastermindAnswerCheck): string[] {
    const result = [];

    possibleKeys.forEach(key => {
      if (this.isAnswerCheckResultEqual(key, keyGuess, check)) {
        result.push(key);
      }
    });

    return result;
  }
}
