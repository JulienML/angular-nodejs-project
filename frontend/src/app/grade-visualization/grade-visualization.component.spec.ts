// Test file automatically created by angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeVisualizationComponent } from './grade-visualization.component';

describe('GradeVisualizationComponent', () => {
  let component: GradeVisualizationComponent;
  let fixture: ComponentFixture<GradeVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
