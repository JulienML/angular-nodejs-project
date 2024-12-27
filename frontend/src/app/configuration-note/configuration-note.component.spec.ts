import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationNoteComponent } from './configuration-note.component';

describe('ConfigurationNoteComponent', () => {
  let component: ConfigurationNoteComponent;
  let fixture: ComponentFixture<ConfigurationNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
