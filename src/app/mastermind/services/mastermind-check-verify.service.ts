import { Injectable } from '@angular/core';
import { IMastermindAnswerCheck } from '../models/answer-check.model';
import { IGameSettings } from '../models/game.settings.model';

@Injectable({
  providedIn: 'root'
})
export class MastermindCheckVerifyService {

  constructor() { }

  public IsGameWon(check: IMastermindAnswerCheck, settings: IGameSettings): boolean {
    return check.whitePts === settings.digits && check.blackPts === 0;
  }

  public IsAnswerCheckFull(check: IMastermindAnswerCheck, settings: IGameSettings): boolean {
    return check.whitePts + check.blackPts >= settings.digits;
  }

  public IsWhitePtsIncrementable(check: IMastermindAnswerCheck, settings: IGameSettings): boolean {
    return !this.IsAnswerCheckFull(check, settings);
  }

  public IsBlackPtsIncrementable(check: IMastermindAnswerCheck, settings: IGameSettings): boolean {
    return !this.IsAnswerCheckFull(check, settings) && check.whitePts + 1 < settings.digits;
  }
}
