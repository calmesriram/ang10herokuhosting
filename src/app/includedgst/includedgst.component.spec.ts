import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludedgstComponent } from './includedgst.component';

describe('IncludedgstComponent', () => {
  let component: IncludedgstComponent;
  let fixture: ComponentFixture<IncludedgstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncludedgstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludedgstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
