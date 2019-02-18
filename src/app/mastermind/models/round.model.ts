export interface IMastermindAnswerCheck {
  whitePts: number;
  blackPts: number;
}

export class MastermindAnswerCheck implements IMastermindAnswerCheck {
  whitePts: number;
  blackPts: number;

  constructor(white: number, black: number) {
      this.whitePts = white;
      this.blackPts = black;
  }
}

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
