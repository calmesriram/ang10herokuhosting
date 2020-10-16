import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SareeproductgstComponent } from './sareeproductgst.component';

describe('SareeproductgstComponent', () => {
  let component: SareeproductgstComponent;
  let fixture: ComponentFixture<SareeproductgstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SareeproductgstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SareeproductgstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
