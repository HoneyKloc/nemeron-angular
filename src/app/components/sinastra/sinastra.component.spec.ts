import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinastraComponent } from './sinastra.component';

describe('SinastraComponent', () => {
  let component: SinastraComponent;
  let fixture: ComponentFixture<SinastraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinastraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinastraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
