import { TestBed } from '@angular/core/testing';

import { MastermindGameService } from './mastermind-game.service';

describe('MastermindGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MastermindGameService = TestBed.get(MastermindGameService);
    expect(service).toBeTruthy();
  });
});
