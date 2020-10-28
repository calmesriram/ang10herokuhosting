import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthandyearwiseinvoiceComponent } from './monthandyearwiseinvoice.component';

describe('MonthandyearwiseinvoiceComponent', () => {
  let component: MonthandyearwiseinvoiceComponent;
  let fixture: ComponentFixture<MonthandyearwiseinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthandyearwiseinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthandyearwiseinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
