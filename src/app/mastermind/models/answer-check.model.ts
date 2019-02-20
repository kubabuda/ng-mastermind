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
