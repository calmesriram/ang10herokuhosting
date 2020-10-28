import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatewiseinvoiceComponent } from './datewiseinvoice.component';

describe('DatewiseinvoiceComponent', () => {
  let component: DatewiseinvoiceComponent;
  let fixture: ComponentFixture<DatewiseinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatewiseinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatewiseinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
