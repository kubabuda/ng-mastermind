import { IMastermindAnswerCheck } from './answer-check.model';

export interface IMastermindAnswer {
  answer: string;
}

export interface IRoundModel extends IMastermindAnswerCheck, IMastermindAnswer { }

export class RoundModel implements IRoundModel {
    public whitePts: number;
    public blackPts: number;

    constructor(
      public answer: string) {
        this.whitePts = 0;
        this.blackPts = 0;
    }
}
