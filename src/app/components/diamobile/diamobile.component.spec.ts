import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamobileComponent } from './diamobile.component';

describe('DiamobileComponent', () => {
  let component: DiamobileComponent;
  let fixture: ComponentFixture<DiamobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiamobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiamobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
