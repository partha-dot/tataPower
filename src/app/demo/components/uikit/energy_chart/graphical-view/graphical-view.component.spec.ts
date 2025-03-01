import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalViewComponent } from './graphical-view.component';

describe('GraphicalViewComponent', () => {
  let component: GraphicalViewComponent;
  let fixture: ComponentFixture<GraphicalViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicalViewComponent]
    });
    fixture = TestBed.createComponent(GraphicalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
