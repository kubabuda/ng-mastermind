import { Injectable } from '@angular/core';
import { GameSettings } from '../../models/game.settings.model';
import { IMastermindAnswerCheck } from '../../models/answer-check.model';
import { error } from 'util';
import { ASolverService } from './asolver.service';

export interface ISolveMastermind {
  // watch out: first round check is ignored!
  getNextGuess(prevRoundCheck: IMastermindAnswerCheck): string;
  // maybe separate getFirstGuess() should be exposed? after separating game logic from component
}

@Injectable({
  providedIn: 'root'
})
export class SwaszekSolverService extends ASolverService implements ISolveMastermind {
  round: number;
  keys: Array<string>;
  codeGuess: string;

  constructor(private settings: GameSettings) {
    super();
    this.initialize();
  }

  private initialize() {
    this.round = 0;
    this.keys = this.getKeysRange(this.settings.digits, this.settings.colors);
  }

  getNextGuess(roundCheck: IMastermindAnswerCheck): string {
    ++this.round;
    if (this.round === 1) {
      // first round check: values is ignored
      this.codeGuess = this.getInitialGuess();
    } else {
      this.keys = this.keysPossibleAfterGuess(this.keys, this.codeGuess, roundCheck);
      if (this.keys !== null && this.keys !== [] && this.keys.length > 0) {
        this.codeGuess = this.keys[0];
      } else {
        throw new error('No keys left in solver!');
      }
    }

    return this.codeGuess;
  }

  getInitialGuess(): string {
    // todo: randomize
    let result = '';
    for (let digit = 1; digit <= this.settings.digits; digit++) {
      result = `${this.settings.colors - digit}${result}`;
    }

    return result;
  }
}
