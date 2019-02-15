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
}

export class RoundModel {
  public answer: string;
  public whitePts: number;
  public blackPts: number;
}

export class RoundModelView {
  public answerColors: string[];
  public whitePts: number;
  public blackPts: number;
}
