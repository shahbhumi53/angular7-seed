import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSeactionComponent } from './search-seaction.component';

describe('SearchSeactionComponent', () => {
  let component: SearchSeactionComponent;
  let fixture: ComponentFixture<SearchSeactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSeactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSeactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
