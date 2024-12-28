import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMarksComponent } from './mainmarks.component';

describe('MainMarksComponent', () => {
  let component: MainMarksComponent;
  let fixture: ComponentFixture<MainMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
