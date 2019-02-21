import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastermindDeluxeComponent } from './mastermind-deluxe.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MastermindCheckVerifyService } from '../../services/mastermind-check-verify.service';
import { IMastermindGameService, MastermindGameService } from '../../services/mastermind-game.service';

describe('MastermindDeluxeComponent', () => {
  let component: MastermindDeluxeComponent;
  let fixture: ComponentFixture<MastermindDeluxeComponent>;

  let isBlackPtsIncrementable = false;
  let isWhitePtsIncrementable = false;
  let isGameWon = false;
  const checkVerifySvcMock = {
    IsBlackPtsIncrementable() {
      return isBlackPtsIncrementable;
    },
    IsWhitePtsIncrementable() {
      return isWhitePtsIncrementable;
    },
    IsGameWon() {
      return isGameWon;
    }
  };

  const gameMock: IMastermindGameService = {
    currentRound: { answer: '0123', whitePts: 0, blackPts: 0, },
    roundNo: 1,
    newGame() {
      this.roundNo = 1;
    },
    getNextRound(): any {
      ++this.roundNo;
      return this.currentRound;
    },
    isGameWon(): boolean {
      return isGameWon;
    }
  };

  let wasSnackbarOpen = false;
  const snackbarMock = {
    open() {
      wasSnackbarOpen = true;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastermindDeluxeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers : [
        { provide: MatSnackBar,  useValue: snackbarMock, },
        { provide: MastermindGameService, useValue: gameMock, },
        { provide: MastermindCheckVerifyService, useValue: checkVerifySvcMock, },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MastermindDeluxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('settings should be Mastermind(5, 8)', () => {
    let settings;
    beforeEach(() => {
      settings = component.getSettings();
    });

    it('digits should be 5', () => {
      expect(settings.digits).toEqual(5);
    });

    it('colors should be 8', () => {
      expect(settings.colors).toEqual(8);
    });
  });

  describe('after  ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('roundModelViews should have inital state', () => {
      expect(component.roundModelViews.length).toBe(1);
    });

    it('white pts # should be 0', () => {
      expect(component.currentRoundCheck().whitePts).toBe(0);
    });

    it('black pts # should be 0', () => {
      expect(component.currentRoundCheck().blackPts).toBe(0);
    });

    describe('after incrementBlack', () => {
      beforeEach(() => {
        expect(component.currentRoundCheck().blackPts).toBe(0);
        isBlackPtsIncrementable = true;
        component.incrementBlack();
      });

      it('black pts # should be 1', () => {
        expect(component.currentRoundCheck().blackPts).toBe(1);
      });

      describe('cleanScore', () => {
        beforeEach(() => {
          component.cleanScore();
        });
      });
    });

    describe('after incrementWhite', () => {
      beforeAll(() => {
        expect(component.currentRoundCheck().whitePts).toBe(0);
        isWhitePtsIncrementable = true;
      });

      it('white pts # should be 1', () => {
        component.incrementWhite();
        expect(component.currentRoundCheck().whitePts).toBe(1);
      });

      describe('after cleanScore', () => {
        beforeAll(() => {
          expect(component.currentRoundCheck().whitePts).toBe(1);
          component.cleanScore();
        });

        it('white pts # should be 0', () => {
          expect(component.currentRoundCheck().whitePts).toBe(0);
        });
      });
    });

    describe('after checkScore when game is not won', () => {
      beforeAll(() => {
        isGameWon = true;
        wasSnackbarOpen = false;
        expect(component.roundModelViews.length).toBe(1);
        component.checkScore();
      });

      it('next round should be started', () => {
        expect(component.roundModelViews.length).toBe(1);
      });

      describe('after second checkScore', () => {
        beforeEach(() => {
          isGameWon = false;
          wasSnackbarOpen = false;
          component.checkScore();
        });

        it('next round should be started', () => {
          expect(component.roundModelViews.length).toBe(2);
        });

        it('snackbar notification should not be opened', () => {
          expect(wasSnackbarOpen).toBe(false);
        });
      });
    });

    describe('after checkScore when game is won', () => {
      beforeEach(() => {
        // setup
        wasSnackbarOpen = false;
        isGameWon = false;
        component.startNewGame();
        component.checkScore();
        component.checkScore();
        expect(component.roundModelViews.length).toBe(3);
        isGameWon = true;
        // act
        component.checkScore();
      });

      it('round view list should be restarted', () => {
        expect(component.roundModelViews.length).toBe(1);
      });

      it('snackbar notification should be opened', () => {
        expect(wasSnackbarOpen).toBe(true);
      });
    });
  });
});
