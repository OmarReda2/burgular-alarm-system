import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorInputsComponent } from './sensor-inputs.component';

describe('SensorInputsComponent', () => {
  let component: SensorInputsComponent;
  let fixture: ComponentFixture<SensorInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
