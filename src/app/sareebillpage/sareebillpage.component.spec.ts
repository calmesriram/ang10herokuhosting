import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SareebillpageComponent } from './sareebillpage.component';

describe('SareebillpageComponent', () => {
  let component: SareebillpageComponent;
  let fixture: ComponentFixture<SareebillpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SareebillpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SareebillpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
