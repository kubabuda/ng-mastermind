import { Injectable } from '@angular/core';
import { GameSettings } from '../models/game.settings.model';
import { IMastermindAnswerCheck, MastermindAnswerCheck } from '../models/round.model';
import { error } from 'util';

export interface ISolveMastermind {
  getNextGuess(prevRoundCheck: IMastermindAnswerCheck): string;
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

  getNextGuess(prevRoundCheck: IMastermindAnswerCheck): string {
    ++this.round;
    if (this.round === 1) {
      return this.getInitialGuess();
    } else {
      // todo implement solving logic

    }

    const answers = [ '11122', '12345', '23456', '34567', '12322' ];
    let result = '';
    if (this.round > 0) {
      result = answers[this.round % 5];
    } else {
      result = answers[this.round];
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
}
