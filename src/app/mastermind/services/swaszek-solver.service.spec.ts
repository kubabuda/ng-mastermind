import { TestBed } from '@angular/core/testing';

import { SwaszekSolverService } from './swaszek-solver.service';

describe('SwaszekSolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwaszekSolverService = TestBed.get(SwaszekSolverService);
    expect(service).toBeTruthy();
  });
});
