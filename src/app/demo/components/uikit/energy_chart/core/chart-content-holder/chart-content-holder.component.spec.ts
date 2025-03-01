import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartContentHolderComponent } from './chart-content-holder.component';

describe('ChartContentHolderComponent', () => {
  let component: ChartContentHolderComponent;
  let fixture: ComponentFixture<ChartContentHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartContentHolderComponent]
    });
    fixture = TestBed.createComponent(ChartContentHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
