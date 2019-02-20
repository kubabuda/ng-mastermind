import { TestBed } from '@angular/core/testing';
import { SwaszekSolverService } from './swaszek-solver.service';
import { GameSettings } from '../../models/game.settings.model';
import { IGenerateKeyRange } from './asolver.service';

describe('SwaszekSolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  let serviceUnderTest: SwaszekSolverService;
  const mastermind46settings = new GameSettings(4, 6);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GameSettings, useValue: mastermind46settings },
      ]
    });
  });

  it('should be created', () => {
    const service: SwaszekSolverService = TestBed.get(SwaszekSolverService);
    expect(service).toBeTruthy();
    serviceUnderTest = service;
  });


  describe('getInitialGuess', () => {
    it('should return 2345 for MM(4,6)', () => {
      const initialGuess = serviceUnderTest.getInitialGuess();

      expect(initialGuess).toBe('2345');
    });
  });

  describe('getNextGuess', () => {
    beforeEach(() => {
      serviceUnderTest = TestBed.get(SwaszekSolverService);
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

    it('should return prev (first) answer if it was 100% valid for MM(4,6)', () => {
      // arrange
      const prevCheck = { whitePts: 4, blackPts: 0 };
      // act
      const guess = serviceUnderTest.getNextGuess(prevCheck);
      // assert
      expect(guess).toBe(serviceUnderTest.getInitialGuess());
      expect(guess).toBe('2345');
    });
  });

  describe('if code was broken as 0345 in second round', () => {
    beforeEach(() => {
      serviceUnderTest = TestBed.get(SwaszekSolverService);
      expect(serviceUnderTest.round).toBe(0);
      const first = serviceUnderTest.getNextGuess({ whitePts: 3, blackPts: 0 });
      expect(first).toBe('2345');

      const second = serviceUnderTest.getNextGuess({ whitePts: 3, blackPts: 0 });
      expect(second).toBe('0345');
    });

    it('should return 0345 for 4wh 0bl ', () => {
      // arrange
      const prevCheck = { whitePts: 4, blackPts: 0 };
      // act
      const guess = serviceUnderTest.getNextGuess(prevCheck);
      // assert
      expect(guess).toBe('0345');
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

  xdescribe('Integration test over entire key range, takes some time', () => {
    const settings = mastermind46settings;
    const generator = new SwaszekSolverService(settings) as IGenerateKeyRange;
    const keys =  generator.getAllKeysRange(settings);

    describe('verifying results', () => {
      const MM46roundsLimit = 7;

      keys.forEach(key => {
        const svc = new SwaszekSolverService(settings);
        let check = { whitePts: 0, blackPts: 0 };
        let roundNo = 0;
        let answer = '';

        for (roundNo = 0; roundNo < MM46roundsLimit; ++roundNo) {
          answer = svc.getNextGuess(check);
          check = svc.checkAnswer(answer, key);

          if (answer === key) {
            break;
          }
        }
        it(`trying to guess ${key} but found ${answer} in  ${roundNo} `, () => {
          expect(answer).toBe(key);
          expect(roundNo).toBeLessThanOrEqual(MM46roundsLimit);
        });
      });
    });

    describe('Checking mean rounds to find solution ', () => {
      const expectedMeanSolvingRounds = 4.67;
      let meanSolvingRounds = 9000;

      beforeAll(() => {
        let roundsSum = 0;

        keys.forEach(key => {
          const svc = new SwaszekSolverService(settings);
          let check = { whitePts: 0, blackPts: 0 };
          let answer = '';

          while (answer !== key) {
            answer = svc.getNextGuess(check);
            check = svc.checkAnswer(answer, key);
            ++roundsSum;
          }
        });
        meanSolvingRounds = roundsSum / keys.length;
      });

      it(`should be under ${expectedMeanSolvingRounds}`, () => {
        expect(meanSolvingRounds).toBeLessThan(expectedMeanSolvingRounds);
      });
    });
  });
});
