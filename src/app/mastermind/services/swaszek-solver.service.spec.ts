import { TestBed } from '@angular/core/testing';

import { SwaszekSolverService } from './swaszek-solver.service';
import { GameSettings } from '../models/game.settings.model';

describe('SwaszekSolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  let serviceUnderTest: SwaszekSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GameSettings, useValue: new GameSettings(4, 6) },
      ]
    });
  });

  it('should be created', () => {
    const service: SwaszekSolverService = TestBed.get(SwaszekSolverService);
    expect(service).toBeTruthy();
    serviceUnderTest = service;
  });

  describe('getKeysRange', () => {
    it('should return 00, 02, 10, 11 for 2, 2', () => {
      const result: string[] = serviceUnderTest.getKeysRange(2, 2);
      expect(result).toEqual([ '00', '01', '10', '11' ]);
    });

    it('should return 0, 1, 2, 3, 4, 5 for 1, 6', () => {
      const result: string[] = serviceUnderTest.getKeysRange(1, 6);
      expect(result).toEqual([ '0', '1', '2', '3', '4', '5' ]);
    });

    it('should return 1296 elems for MM(4, 6)', () => {
      const result: string[] = serviceUnderTest.getKeysRange(4, 6);
      expect(result.length).toEqual(1296);
      expect(result[0]).toEqual('0000');
      expect(result[1]).toEqual('0001');
      expect(result[2]).toEqual('0002');
      expect(result[641]).toEqual('2545');
      expect(result[643]).toEqual('2551');
      expect(result[644]).toEqual('2552');
      expect(result[1295]).toEqual('5555');
    });
  });

  describe('getInitialGuess', () => {
    it('should return 2345 for MM(4,6)', () => {
      const initialGuess = serviceUnderTest.getInitialGuess();

      expect(initialGuess).toBe('2345');
    });
  });

  describe('getNextGuess', () => {
    beforeAll(() => {
      expect(serviceUnderTest.round).toBe(0);
    });

    it('should return 2345 for MM(4,6)', () => {
      // arrange
      const prevCheck = { whitePts: 0, blackPts: 0, answer: 'none' };
      // act
      const initialGuess = serviceUnderTest.getNextGuess(prevCheck);
      // assert
      expect(initialGuess).toBe('2345');
      expect(serviceUnderTest.round).toBe(1);
    });
  });

  describe('checkAnswer', () => {

    const testCases = [
      { answer1: '1111', answer2: '2222', white: 0, black: 0 },
      { answer1: '2222', answer2: '1111', white: 0, black: 0 },
      { answer1: '1122', answer2: '1122', white: 4, black: 0 },
      { answer1: '1234', answer2: '4321', white: 0, black: 4 },
      { answer1: '1254', answer2: '1524', white: 2, black: 2 },
      { answer1: '1253', answer2: '1524', white: 1, black: 2 },
    ];

    testCases.forEach((test, index) => {
      it(`for ${test.answer1} and ${test.answer2} should return ${test.white} white and ${test.black} black [${index + 1}]`, () => {
        // act
        const check = serviceUnderTest.checkAnswer(test.answer1, test.answer2);
        // assert
        expect(check.whitePts).toBe(test.white);
        expect(check.blackPts).toBe(test.black);
      });
    });
  });

  describe('isAnswerCheckResultEqual', () => {
    const testCases = [
      { answer1: '1111', answer2: '2222', white: 0, black: 0, is: true },
      { answer1: '2222', answer2: '1111', white: 0, black: 0, is: true },
      { answer1: '1122', answer2: '1122', white: 4, black: 0, is: true },
      { answer1: '1234', answer2: '4321', white: 0, black: 4, is: true },
      { answer1: '1254', answer2: '1524', white: 2, black: 2, is: true },
      { answer1: '1253', answer2: '1524', white: 1, black: 2, is: true },
      { answer1: '1111', answer2: '2222', white: 2, black: 0, is: false },
      { answer1: '2222', answer2: '1111', white: 4, black: 0, is: false },
      { answer1: '1122', answer2: '1122', white: 3, black: 0, is: false },
      { answer1: '1234', answer2: '4321', white: 1, black: 3, is: false },
      { answer1: '1254', answer2: '1524', white: 2, black: 1, is: false },
      { answer1: '1253', answer2: '1524', white: 1, black: 1, is: false },
    ];

    testCases.forEach((test, index) => {
      it(`for ${test.answer1}, ${test.answer2}, check ${test.white} white and ${test.black} black should be ${test.is} [${index + 1}]`,
      () => {
        // arrange
        const check = { whitePts: test.white, blackPts: test.black, };
        // act
        const result = serviceUnderTest.isAnswerCheckResultEqual(test.answer1, test.answer2, check);
        // assert
        expect(result).toBe(test.is);
      });
    });
  });

  describe('prunedKeys', () => {
    const testCases = [
      { keys: [ '1111', '2222'], answer: '1111', white: 0, black: 0, after: [ '2222' ] },
      { keys: [ '1111', '2222', '2233', '3333'], answer: '1111', white: 0, black: 0, after: [ '2222', '2233', '3333' ] },
    ];

    testCases.forEach((test, index) => {
      it(`[${index + 1}] for ${test.keys}, a${test.answer}, check ${test.white} white and ${test.black} black should return ${test.after} `,
      () => {
        // arrange
        const check = { whitePts: test.white, blackPts: test.black, answer: test.answer, };
        // act
        const result = serviceUnderTest.prunedKeys(test.keys, check);
        // assert
        expect(result).toEqual(test.after);
      });
    });
  });
});
