import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastermindComponent } from './mastermind.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MastermindComponent', () => {
  let component: MastermindComponent;
  let fixture: ComponentFixture<MastermindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastermindComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
      expect(component.lastRound.whitePts).toBe(0);
    });

    it('black pts # should be 0', () => {
      expect(component.lastRound.blackPts).toBe(0);
    });

    describe('after incrementBlack', () => {
      beforeEach(() => {
        expect(component.lastRound.blackPts).toBe(0);
        component.incrementBlack();
      });

      it('black pts # should be 1', () => {
        expect(component.lastRound.blackPts).toBe(1);
      });

      describe('cleanScore', () => {
        beforeEach(() => {
          component.cleanScore();
        });

        it('black pts # should be 0', () => {
          expect(component.lastRound.blackPts).toBe(0);
        });
      });
    });

    describe('after incrementWhite', () => {
      beforeAll(() => {
        expect(component.lastRound.whitePts).toBe(0);
      });

      it('white pts # should be 1', () => {
        component.incrementWhite();
        expect(component.lastRound.whitePts).toBe(1);
      });

      describe('after cleanScore', () => {
        beforeAll(() => {
          expect(component.lastRound.whitePts).toBe(1);
          component.cleanScore();
        });

        it('white pts # should be 0', () => {
          expect(component.lastRound.whitePts).toBe(0);
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
});
