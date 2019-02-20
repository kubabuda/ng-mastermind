import { Injectable } from '@angular/core';
import { IMastermindAnswerCheck } from '../models/answer-check.model';
import { IGameSettings } from '../models/game.settings.model';
import { IRoundModel, RoundModel } from '../models/round.model';
import { ISolveMastermind, SwaszekSolverService } from './swaszek-solver.service';
import { MastermindCheckVerifyService } from './mastermind-check-verify.service';

export interface IMastermindGameService {
  currentRound: IRoundModel;
  roundNo: number;
  newGame(settings: IGameSettings): void;
  getNextRound(check: IMastermindAnswerCheck): IRoundModel;
  isGameWon(roundCheck: IMastermindAnswerCheck): boolean;
}


@Injectable({
  providedIn: 'root'
})
// TODO move to service (specs too)
export class MastermindGameService implements IMastermindGameService {
  currentRound: IRoundModel;
  // currentRoundCheck: IRoundModel;
  roundNo = 0;
  private settings: IGameSettings;
  private solver: ISolveMastermind;

  constructor(private checkVerifyService: MastermindCheckVerifyService) { }

  newGame(settings: IGameSettings): void {
    this.settings = settings;
    this.roundNo = 0;
    this.solver = new SwaszekSolverService(settings);
    this.currentRound = this.getNextRound(this.currentRound); // round is null here but first value is ignored
  }

  getNextRound(check: IMastermindAnswerCheck): IRoundModel {
    this.roundNo += 1;
    const nextAnswer = this.solver.getNextGuess(check);

    return new RoundModel(nextAnswer); // TODO split to take separate check and answer
  }

  isGameWon(roundCheck: IMastermindAnswerCheck): boolean {
    if (this.checkVerifyService.IsGameWon(roundCheck, this.settings)) {
      return true;
    } else {
      return false;
    }
  }
}
