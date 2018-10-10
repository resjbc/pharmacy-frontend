import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActComponent } from './create-act.component';

describe('CreateActComponent', () => {
  let component: CreateActComponent;
  let fixture: ComponentFixture<CreateActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
