import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeConfigComponent } from './grade-config.component';

describe('GradeConfigComponent', () => {
  let component: GradeConfigComponent;
  let fixture: ComponentFixture<GradeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
