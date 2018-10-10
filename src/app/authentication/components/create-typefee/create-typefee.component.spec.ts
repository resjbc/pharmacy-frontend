import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypefeeComponent } from './create-typefee.component';

describe('CreateTypefeeComponent', () => {
  let component: CreateTypefeeComponent;
  let fixture: ComponentFixture<CreateTypefeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTypefeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTypefeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
