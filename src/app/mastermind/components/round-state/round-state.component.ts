import { Component, OnInit, Input } from '@angular/core';
import { IRoundModelView } from '../../models/round.view.model';

@Component({
  selector: 'app-round-state',
  templateUrl: './round-state.component.html',
  styleUrls: ['./round-state.component.css']
})
export class RoundStateComponent implements OnInit {

  @Input()
  modelView: IRoundModelView;

  constructor() { }

  ngOnInit() {
  }

}
