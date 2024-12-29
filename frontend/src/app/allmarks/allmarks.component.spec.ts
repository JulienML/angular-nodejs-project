import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMarksComponent } from './allmarks.component';

describe('AllmarksComponent', () => {
  let component: AllMarksComponent;
  let fixture: ComponentFixture<AllMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
