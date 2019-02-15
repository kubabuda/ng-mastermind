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
});
