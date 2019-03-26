import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonPageComponent } from './search-person-page.component';

describe('SearchPersonPageComponent', () => {
  let component: SearchPersonPageComponent;
  let fixture: ComponentFixture<SearchPersonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPersonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPersonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
