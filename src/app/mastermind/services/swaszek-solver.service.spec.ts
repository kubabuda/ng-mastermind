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
      const prevCheck = { whitePts: 0, blackPts: 0 };
      // act
      const initialGuess = serviceUnderTest.getNextGuess(prevCheck);
      // assert
      expect(initialGuess).toBe('2345');
      expect(serviceUnderTest.round).toBe(1);
    });
  });
});
