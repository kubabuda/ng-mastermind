import { Component, OnInit } from '@angular/core';
import { RoundModel } from '../models/round.model';
import { RoundModelView } from '../models/round.view.model';

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {

  roundModelView: RoundModelView;

  constructor() {
  }

  ngOnInit() {
    const roundModel = new RoundModel('11122');
    roundModel.blackPts = 1;
    roundModel.whitePts = 2;

    this.roundModelView = new RoundModelView(roundModel);
  }

}
