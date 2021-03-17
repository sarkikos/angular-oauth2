import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Welcome2Component } from './welcome2.component';

describe('Welcome2Component', () => {
  let component: Welcome2Component;
  let fixture: ComponentFixture<Welcome2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Welcome2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Welcome2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
