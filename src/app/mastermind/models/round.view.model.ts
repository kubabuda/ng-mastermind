import { RoundModel } from './round.model';

export interface IRoundModelView {
  answerColors: string[];
  checkColors: string[];
  checkVisibility: string[];
}

export class RoundModelView implements IRoundModelView {
    public answerColors: string[];
    public checkColors: string[];
    public checkVisibility: string[];

    private availableAswerColors = [ 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'white', 'black' ];

    constructor(model: RoundModel) {
      const codeLength = model.answer.length;
      if (codeLength < (model.whitePts + model.blackPts)
       || codeLength === model.whitePts - 1 && model.blackPts === 1) {
        throw new Error(
      `Code ${model.answer} with len= ${codeLength} cannot have ${model.whitePts} white and ${model.blackPts} black points`);
      }

      this.answerColors = [];
      this.checkColors = [];
      this.checkVisibility = [];

      for (let i = 0; i < codeLength; i++) {
        const digit = model.answer.charAt(i);
        const element: number = parseInt(digit, 10);
        this.answerColors.push(this.availableAswerColors[element]);

        if (i < model.whitePts) {
          this.checkColors.push('white');
        } else {
          this.checkColors.push('black');
        }

        if (i < model.whitePts + model.blackPts) {
          this.checkVisibility.push('visible');
        } else {
          this.checkVisibility.push('hidden');
        }
      }
    }
}
