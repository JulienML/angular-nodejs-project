import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainmarksComponent } from './mainmarks.component';

describe('MainmarksComponent', () => {
  let component: MainmarksComponent;
  let fixture: ComponentFixture<MainmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainmarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
