import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUsePricingInfoComponent } from './start-use-pricing-info.component';

describe('StartUsePricingInfoComponent', () => {
  let component: StartUsePricingInfoComponent;
  let fixture: ComponentFixture<StartUsePricingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartUsePricingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUsePricingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
