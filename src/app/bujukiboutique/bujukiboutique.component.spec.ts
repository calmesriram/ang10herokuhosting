import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BujukiboutiqueComponent } from './bujukiboutique.component';

describe('BujukiboutiqueComponent', () => {
  let component: BujukiboutiqueComponent;
  let fixture: ComponentFixture<BujukiboutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BujukiboutiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BujukiboutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
