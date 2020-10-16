import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonincludedgstComponent } from './nonincludedgst.component';

describe('NonincludedgstComponent', () => {
  let component: NonincludedgstComponent;
  let fixture: ComponentFixture<NonincludedgstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonincludedgstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonincludedgstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
