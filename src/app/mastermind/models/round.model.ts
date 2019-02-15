export interface IMastermindCheck {
  answer: string;
  whitePts: number;
  blackPts: number;
}

export interface IRoundModel extends IMastermindCheck {
  answer: string;
}

export class RoundModel implements IRoundModel {
    public whitePts: number;
    public blackPts: number;

    constructor(
      public answer: string) {
        this.whitePts = 0;
        this.blackPts = 0;
    }
}
