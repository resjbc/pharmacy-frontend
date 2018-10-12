import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReceiptsDateComponent } from './search-receipts-date.component';

describe('SearchReceiptsDateComponent', () => {
  let component: SearchReceiptsDateComponent;
  let fixture: ComponentFixture<SearchReceiptsDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchReceiptsDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReceiptsDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
