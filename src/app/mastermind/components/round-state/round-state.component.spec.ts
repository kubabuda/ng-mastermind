import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundStateComponent } from './round-state.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RoundStateComponent', () => {
  let component: RoundStateComponent;
  let fixture: ComponentFixture<RoundStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundStateComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  const roundModelView = {
    answerColors: [ 'green', 'red', 'blue', ],
    checkColors: [ 'white', 'black', 'black' ],
    checkVisibility: [ 'visible', 'visible', 'visible' ],
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundStateComponent);
    component = fixture.componentInstance;
    component.modelView = roundModelView;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
