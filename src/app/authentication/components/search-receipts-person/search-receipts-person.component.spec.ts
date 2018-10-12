import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReceiptsPersonComponent } from './search-receipts-person.component';

describe('SearchReceiptsPersonComponent', () => {
  let component: SearchReceiptsPersonComponent;
  let fixture: ComponentFixture<SearchReceiptsPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchReceiptsPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReceiptsPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
