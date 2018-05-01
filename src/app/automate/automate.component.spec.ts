import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomateComponent } from './automate.component';

describe('AutomateComponent', () => {
  let component: AutomateComponent;
  let fixture: ComponentFixture<AutomateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
