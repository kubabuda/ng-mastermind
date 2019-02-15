import { Component, OnInit, Input } from '@angular/core';
import { RoundModelView } from '../../models/round.view.model';

@Component({
  selector: 'app-round-state',
  templateUrl: './round-state.component.html',
  styleUrls: ['./round-state.component.css']
})
export class RoundStateComponent implements OnInit {

  @Input()
  modelView: RoundModelView;

  constructor() { }

  ngOnInit() {
  }

}
