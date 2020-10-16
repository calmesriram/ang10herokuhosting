import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SareeproductpageComponent } from './sareeproductpage.component';

describe('SareeproductpageComponent', () => {
  let component: SareeproductpageComponent;
  let fixture: ComponentFixture<SareeproductpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SareeproductpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SareeproductpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
