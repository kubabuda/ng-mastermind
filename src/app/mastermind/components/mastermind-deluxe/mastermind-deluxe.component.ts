import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { GameSettings } from '../../models/game.settings.model';
import { MastermindCheckVerifyService } from '../../services/mastermind-check-verify.service';
import { MastermindGameService } from '../../services/mastermind-game.service';
import { MastermindComponent } from '../mastermind/mastermind.component';


@Component({
  selector: 'app-mastermind-deluxe',
  templateUrl: './mastermind-deluxe.component.html',
  styleUrls: ['./mastermind-deluxe.component.css']
})
export class MastermindDeluxeComponent extends MastermindComponent {

  constructor(
    snackBar: MatSnackBar,
    checkVerifyService: MastermindCheckVerifyService,
    game: MastermindGameService) {
      super(snackBar, checkVerifyService, game);
      this.settings = new GameSettings(5, 8);
  }
}
