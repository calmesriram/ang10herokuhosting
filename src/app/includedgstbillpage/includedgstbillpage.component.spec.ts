import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludedgstbillpageComponent } from './includedgstbillpage.component';

describe('IncludedgstbillpageComponent', () => {
  let component: IncludedgstbillpageComponent;
  let fixture: ComponentFixture<IncludedgstbillpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncludedgstbillpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludedgstbillpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
