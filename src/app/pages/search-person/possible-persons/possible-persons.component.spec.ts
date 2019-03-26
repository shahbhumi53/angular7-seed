import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PossiblePersonsComponent } from './possible-persons.component';

describe('PossiblePersonsComponent', () => {
  let component: PossiblePersonsComponent;
  let fixture: ComponentFixture<PossiblePersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PossiblePersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PossiblePersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
