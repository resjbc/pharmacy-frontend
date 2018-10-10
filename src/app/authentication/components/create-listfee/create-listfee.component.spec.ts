import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListfeeComponent } from './create-listfee.component';

describe('CreateListfeeComponent', () => {
  let component: CreateListfeeComponent;
  let fixture: ComponentFixture<CreateListfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateListfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
