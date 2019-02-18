import { TestBed } from '@angular/core/testing';

import { MastermindCheckVerifyService } from './mastermind-check-verify.service';

describe('MastermindCheckVerifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  let service: MastermindCheckVerifyService;

  it('should be created', () => {
    const serviceToTest: MastermindCheckVerifyService = TestBed.get(MastermindCheckVerifyService);
    expect(serviceToTest).toBeTruthy();
    service = serviceToTest;
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
        const result = service.IsWhitePtsIncrementable(test.check, settings);
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
        const result = service.IsBlackPtsIncrementable(test.check, settings);
        // assert
        expect(result).toBe(test.is);
      });
    });
  });

  describe(' IsGameWon', () => {
    const settings = {
      digits: 4, colors: 0,
    };
    const testCases = [
      { check: { whitePts: settings.digits, blackPts: 0, }, is: true },
      { check: { whitePts: 0, blackPts: 0, }, is: false },
      { check: { whitePts: 4, blackPts: 1, }, is: false },
      { check: { whitePts: 3, blackPts: 0, }, is: false },
      { check: { whitePts: 2, blackPts: 2, }, is: false },
    ];

    testCases.forEach((test, index) => {
      it(`[${index + 1}] for MM(${settings.digits}, ${settings.colors})'
      '${test.check.whitePts} white and ${test.check.blackPts} black should be ${test.is} `,
      () => {
        // act
        const result = service.IsGameWon(test.check, settings);
        // assert
        expect(result).toBe(test.is);
      });
    });
  });
});
