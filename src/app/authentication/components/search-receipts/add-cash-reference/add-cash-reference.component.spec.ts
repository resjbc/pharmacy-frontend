import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCashReferenceComponent } from './add-cash-reference.component';

describe('AddCashReferenceComponent', () => {
  let component: AddCashReferenceComponent;
  let fixture: ComponentFixture<AddCashReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCashReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCashReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
