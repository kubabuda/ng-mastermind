import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastermindComponent } from './mastermind.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBar } from '@angular/material';

describe('MastermindComponent', () => {
  let component: MastermindComponent;
  let fixture: ComponentFixture<MastermindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastermindComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers : [
        { provide: MatSnackBar,  useValue: { open() {}  }, }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastermindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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

    it('round # should be 1', () => {
      expect(component.round).toBe(1);
    });

    it('white pts # should be 0', () => {
      expect(component.currentRound.whitePts).toBe(0);
    });

    it('black pts # should be 0', () => {
      expect(component.currentRound.blackPts).toBe(0);
    });

    describe('after incrementBlack', () => {
      beforeEach(() => {
        expect(component.currentRound.blackPts).toBe(0);
        component.incrementBlack();
      });

      it('black pts # should be 1', () => {
        expect(component.currentRound.blackPts).toBe(1);
      });

      describe('cleanScore', () => {
        beforeEach(() => {
          component.cleanScore();
        });

        it('black pts # should be 0', () => {
          expect(component.currentRound.blackPts).toBe(0);
        });
      });
    });

    describe('after incrementWhite', () => {
      beforeAll(() => {
        expect(component.currentRound.whitePts).toBe(0);
      });

      it('white pts # should be 1', () => {
        component.incrementWhite();
        expect(component.currentRound.whitePts).toBe(1);
      });

      describe('after cleanScore', () => {
        beforeAll(() => {
          expect(component.currentRound.whitePts).toBe(1);
          component.cleanScore();
        });

        it('white pts # should be 0', () => {
          expect(component.currentRound.whitePts).toBe(0);
        });
      });
    });

    describe('after checkScore', () => {
      beforeAll(() => {
        expect(component.roundModelViews.length).toBe(1);
        expect(component.round).toBe(1);
        component.checkScore();
      });

      it('next round should be started', () => {
        expect(component.roundModelViews.length).toBe(1);
      });

      describe('after second checkScore', () => {
        beforeEach(() => {
          component.checkScore();
        });

        it('round # should be incremented', () => {
          expect(component.round).toBe(2);
        });

        it('next round should be started', () => {
          expect(component.roundModelViews.length).toBe(2);
        });
      });
    });
  });

  describe('IsWhitePtsIncrementable', () => {
    const settings = {
      digits: 4, colors: 0,
    };
    const testCases = [
      { check: { whitePts: 0, blackPts: 0, }, is: true },
      { check: { whitePts: 4, blackPts: 0, }, is: false },
      { check: { whitePts: 0, blackPts: 4, }, is: false },
      { check: { whitePts: 2, blackPts: 2, }, is: false },
      { check: { whitePts: 1, blackPts: 3, }, is: false },
      { check: { whitePts: 3, blackPts: 1, }, is: false },
      { check: { whitePts: 2, blackPts: 1, }, is: true },
      { check: { whitePts: 3, blackPts: 0, }, is: true },
      { check: { whitePts: 1, blackPts: 1, }, is: true },
      { check: { whitePts: 5, blackPts: 1, }, is: false },
      { check: { whitePts: 0, blackPts: 5, }, is: false },
    ];

    testCases.forEach((test, index) => {
      it(`for MM(${settings.digits}, ${settings.colors}), ${test.check.whitePts} white'
      + ' and ${test.check.blackPts} black should be ${test.is} [${index + 1}]`,
      () => {
        // act
        const result = component.IsWhitePtsIncrementable(test.check, settings);
        // assert
        expect(result).toBe(test.is);
      });
    });
  });

  describe('IsBlackPtsIncrementable', () => {
    const settings = {
      digits: 4, colors: 0,
    };
    const testCases = [
      { check: { whitePts: 0, blackPts: 0, }, is: true },
      { check: { whitePts: 4, blackPts: 0, }, is: false },
      { check: { whitePts: 0, blackPts: 4, }, is: false },
      { check: { whitePts: 2, blackPts: 2, }, is: false },
      { check: { whitePts: 1, blackPts: 3, }, is: false },
      { check: { whitePts: 3, blackPts: 1, }, is: false },
      { check: { whitePts: 2, blackPts: 1, }, is: true },
      { check: { whitePts: 3, blackPts: 0, }, is: false },
      { check: { whitePts: 1, blackPts: 1, }, is: true },
      { check: { whitePts: 5, blackPts: 1, }, is: false },
      { check: { whitePts: 0, blackPts: 5, }, is: false },
    ];

    testCases.forEach((test, index) => {
      it(`for MM(${settings.digits}, ${settings.colors}), ${test.check.whitePts} white'
      + ' and ${test.check.blackPts} black should be ${test.is} [${index + 1}]`,
      () => {
        // act
        const result = component.IsBlackPtsIncrementable(test.check, settings);
        // assert
        expect(result).toBe(test.is);
      });
    });
  });
});
