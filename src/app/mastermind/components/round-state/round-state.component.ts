import { Component, OnInit, Input } from '@angular/core';
import { IRoundModelView } from '../../models/round.view.model';

@Component({
  selector: 'app-round-state',
  templateUrl: './round-state.component.html',
  styleUrls: ['./round-state.component.css']
})
export class RoundStateComponent implements OnInit {
  visible = 'visible';
  hidden = 'hidden';

  @Input()
  modelView: IRoundModelView;
  lastColorVisibility = this.hidden;
  lastCheckVisibility = this.hidden;
  constructor() { }

  ngOnInit() {
    this.lastColorVisibility = this.get5thDigitVisibility(this.modelView);
    this.lastCheckVisibility = this.get5thCheckVisibility(this.modelView);
  }

  // TODO works but is hacky, maybe create roundView builder service
  private is5DigitRound(modelView: IRoundModelView) {
    return modelView.answerColors.length > 4
      && modelView.checkVisibility.length > 4;
  }

  get5thDigitVisibility(modelView: IRoundModelView): string {
    if (this.is5DigitRound(modelView)) {
      return this.visible;
    }
    return this.hidden;
  }

  get5thCheckVisibility(modelView: IRoundModelView): string {
    if (this.is5DigitRound(modelView)) {
      return modelView.checkVisibility[4];
    }
    return this.hidden;
  }
}
