import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-mastermind';
  answerColors = [ 'red', 'blue', 'brown', 'orange', 'white' ];
  checkColors = [ 'white', 'white', 'black', 'black', 'black' ];
  checkVisibility = [ 'visible', 'visible', 'visible', 'visible', 'hidden' ];

  roundModel: RoundModelView;

  constructor() {
    const roundModel = new RoundModel('11122');
    roundModel.blackPts = 1;
    roundModel.whitePts = 2;

    this.roundModel = new RoundModelView(roundModel);
  }
}

export class RoundModel {
  public whitePts: number;
  public blackPts: number;

  constructor(
    public answer: string) {
  }
}

export class RoundModelView {
  public answerColors: string[];
  public checkColors: string[];
  public checkVisibility: string[];

  availableAswerColors = [ 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'white', 'black' ];

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
