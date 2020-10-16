import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonincludedgstbillpageComponent } from './nonincludedgstbillpage.component';

describe('NonincludedgstbillpageComponent', () => {
  let component: NonincludedgstbillpageComponent;
  let fixture: ComponentFixture<NonincludedgstbillpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonincludedgstbillpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonincludedgstbillpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
