import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardCardReviewComponent } from './flashcard-card-review-component';

describe('FlashcardCardReviewComponent', () => {
  let component: FlashcardCardReviewComponent;
  let fixture: ComponentFixture<FlashcardCardReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardCardReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardCardReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
