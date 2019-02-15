import { Component, OnInit } from '@angular/core';
import { RoundModel } from '../../models/round.model';
import { RoundModelView } from '../../models/round.view.model';

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  roundModelViews: RoundModelView[];

  constructor() {
  }

  ngOnInit() {
    const roundModel = new RoundModel('11122');
    roundModel.whitePts = 2;
    roundModel.blackPts = 1;

    const roundModel2 = new RoundModel('16242');
    roundModel2.whitePts = 1;
    roundModel2.blackPts = 3;

    this.roundModelViews = [
      new RoundModelView(roundModel),
      new RoundModelView(roundModel2),
      new RoundModelView(roundModel),
    ];
  }

}
