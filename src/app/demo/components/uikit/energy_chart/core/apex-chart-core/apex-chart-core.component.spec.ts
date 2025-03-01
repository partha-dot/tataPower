import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexChartCoreComponent } from './apex-chart-core.component';

describe('ApexChartCoreComponent', () => {
  let component: ApexChartCoreComponent;
  let fixture: ComponentFixture<ApexChartCoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApexChartCoreComponent]
    });
    fixture = TestBed.createComponent(ApexChartCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
