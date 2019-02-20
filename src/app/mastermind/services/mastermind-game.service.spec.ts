import { TestBed, async, } from '@angular/core/testing';

import { MastermindGameService } from './mastermind-game.service';
import { MastermindCheckVerifyService } from './mastermind-check-verify.service';
import { GameSettings } from '../models/game.settings.model';
import { IRoundModel } from '../models/round.model';

describe('MastermindGameService', () => {
  let service: MastermindGameService;

  let isGameWon = false;
  const checkVerifySvcMock = {
    IsBlackPtsIncrementable() {
      return false;
    },
    IsWhitePtsIncrementable() {
      return false;
    },
    IsGameWon() {
      return isGameWon;
    }
  };

  const mastermind46settings = new GameSettings(4, 6);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers : [
        { provide: MastermindCheckVerifyService, useValue: checkVerifySvcMock }
      ]
    });
  }));

  it('should be created', () => {
    const svc: MastermindGameService = TestBed.get(MastermindGameService);
    expect(svc).toBeTruthy();
    service = svc;
  });

  describe('after  ngOnInit', () => {
    beforeAll(() => {
      service.newGame(mastermind46settings);
    });

    it('round # should be 1', () => {
      expect(service.roundNo).toBe(1);
    });

    it('white pts # should be 0', () => {
      expect(service.currentRound.whitePts).toBe(0);
    });

    it('black pts # should be 0', () => {
      expect(service.currentRound.blackPts).toBe(0);
    });

    describe('after checkScore when game is not won', () => {
      let answer1: IRoundModel;
      beforeAll(() => {
        expect(service.roundNo).toBe(1);
        answer1 = service.getNextRound({ whitePts: 3, blackPts: 0 });
      });

      it('round # should be incremented', () => {
        expect(service.roundNo).toBe(2);
      });

      describe('after second checkScore', () => {
        let answer2: IRoundModel;
        beforeAll(() => {
          answer2 = service.getNextRound({ whitePts: 3, blackPts: 0 });
        });

        it('round # should be incremented', () => {
          expect(service.roundNo).toBe(3);
        });

        it('round # should be incremented', () => {
          expect(service.roundNo).toBe(3);
        });

        describe('when game is reset', () => {
          beforeEach(() => {
            // setup
            isGameWon = false;
            service.newGame(mastermind46settings);
          });

          it('round # should be reset', () => {
            expect(service.roundNo).toBe(1);
          });
        });
      });
    });
  });

  describe('isGameWon', () => {
    it('should be true when check service returns true', () => {
      isGameWon = true;
      expect(service.isGameWon({ whitePts: 0, blackPts: 0 })).toBe(isGameWon);
    });

    it('should be false when check service returns false', () => {
      isGameWon = false;
      expect(service.isGameWon({ whitePts: 0, blackPts: 0 })).toBe(isGameWon);
    });
  });
});
