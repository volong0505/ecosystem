import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VocabularyTrackerTableComponent } from './vocabulary-tracker-table-component';

describe('VocabularyTrackerTableComponent', () => {
  let component: VocabularyTrackerTableComponent;
  let fixture: ComponentFixture<VocabularyTrackerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyTrackerTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyTrackerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
