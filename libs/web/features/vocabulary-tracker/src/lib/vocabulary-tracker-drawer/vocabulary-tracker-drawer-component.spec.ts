import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VocabularyTrackerDrawerComponent } from './vocabulary-tracker-drawer-component';

describe('VocabularyTrackerDrawerComponent', () => {
  let component: VocabularyTrackerDrawerComponent;
  let fixture: ComponentFixture<VocabularyTrackerDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyTrackerDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyTrackerDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
