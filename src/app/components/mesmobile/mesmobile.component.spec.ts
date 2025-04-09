import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesmobileComponent } from './mesmobile.component';

describe('MesmobileComponent', () => {
  let component: MesmobileComponent;
  let fixture: ComponentFixture<MesmobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesmobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
