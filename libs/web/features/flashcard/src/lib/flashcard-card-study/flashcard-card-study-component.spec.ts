import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardCardStudyComponent } from './flashcard-card-study-component';

describe('FlashcardCardStudyComponent', () => {
  let component: FlashcardCardStudyComponent;
  let fixture: ComponentFixture<FlashcardCardStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardCardStudyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardCardStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
