import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReceiptsCashComponent } from './search-receipts-cash.component';

describe('SearchReceiptsCashComponent', () => {
  let component: SearchReceiptsCashComponent;
  let fixture: ComponentFixture<SearchReceiptsCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchReceiptsCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReceiptsCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
