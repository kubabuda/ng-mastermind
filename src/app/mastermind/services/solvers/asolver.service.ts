import { IGameSettings } from '../../models/game.settings.model';
import { IMastermindAnswerCheck, MastermindAnswerCheck } from '../../models/answer-check.model';
import { error } from 'util';


export interface IGenerateKeyRange {
  getAllKeysRange(settings: IGameSettings): string[];
}

export interface ICheckAnswers {
  checkAnswer(answer1: string, answer2: string): IMastermindAnswerCheck;
  isAnswerCheckResultEqual(answer1: string, answer2: string, check: IMastermindAnswerCheck): boolean;
}

export interface IPruneKeys {
  keysPossibleAfterGuess(possibleKeys: string[], guessedKey: string, guessKeyCheck: IMastermindAnswerCheck): string[];
}


export abstract class ASolverService implements IGenerateKeyRange {

  getAllKeysRange(settings: IGameSettings): string[] {
    return this.getKeysRange(settings.digits, settings.colors);
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

  keysPossibleAfterGuess(possibleKeys: string[], guessedKey: string, guessKeyCheck: IMastermindAnswerCheck): string[] {
    const result = [];

    possibleKeys.forEach(key => {
      if (this.isAnswerCheckResultEqual(key, guessedKey, guessKeyCheck)) {
        result.push(key);
      }
    });

    return result;
  }
}
