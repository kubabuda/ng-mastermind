import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastermindComponent } from './mastermind.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MastermindCheckVerifyService } from '../../services/mastermind-check-verify.service';

describe('MastermindComponent', () => {
  let component: MastermindComponent;
  let fixture: ComponentFixture<MastermindComponent>;

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

  let wasSnackbarOpen = false;
  const snackbarMock = { open() {
    wasSnackbarOpen = true;
  } };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastermindComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers : [
        { provide: MatSnackBar,  useValue: snackbarMock, },
        { provide: MastermindCheckVerifyService, useValue: checkVerifySvcMock }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MastermindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('after  ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('roundModelViews should have inital state', () => {
      expect(component.roundModelViews.length).toBe(1);
    });

    it('white pts # should be 0', () => {
      expect(component.game.currentRound.whitePts).toBe(0);
    });

    it('black pts # should be 0', () => {
      expect(component.game.currentRound.blackPts).toBe(0);
    });

    describe('after incrementBlack', () => {
      beforeEach(() => {
        expect(component.game.currentRound.blackPts).toBe(0);
        isBlackPtsIncrementable = true;
        component.incrementBlack();
      });

      it('black pts # should be 1', () => {
        expect(component.game.currentRound.blackPts).toBe(1);
      });

      describe('cleanScore', () => {
        beforeEach(() => {
          component.cleanScore();
        });
      });
    });

    describe('after incrementWhite', () => {
      beforeAll(() => {
        expect(component.game.currentRound.whitePts).toBe(0);
        isWhitePtsIncrementable = true;
      });

      it('white pts # should be 1', () => {
        component.incrementWhite();
        expect(component.game.currentRound.whitePts).toBe(1);
      });

      describe('after cleanScore', () => {
        beforeAll(() => {
          expect(component.game.currentRound.whitePts).toBe(1);
          component.cleanScore();
        });

        it('white pts # should be 0', () => {
          expect(component.game.currentRound.whitePts).toBe(0);
        });
      });
    });

    describe('after checkScore when game is not won', () => {
      beforeAll(() => {
        wasSnackbarOpen = false;
        expect(component.roundModelViews.length).toBe(1);
        component.checkScore();
      });

      it('next round should be started', () => {
        expect(component.roundModelViews.length).toBe(1);
      });

      describe('after second checkScore', () => {
        beforeEach(() => {
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
        expect(component.game.roundNo).toBe(3);
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
