import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FlashcardCardReviewComponent } from './flashcard-card-review/flashcard-card-review-component';
import { FlashcardCardStudyComponent } from './flashcard-card-study/flashcard-card-study-component';
import { DataAccessFlashcardStore } from '@ecosystem/data-access-flashcard';
@Component({
  selector: 'flashcard-feature',
  imports: [
    CommonModule,
    FlashcardCardReviewComponent,
    FlashcardCardStudyComponent
  ],
  templateUrl: './web-flashcard-feature.html',
  styleUrl: './web-flashcard-feature.css',
})
export class WebFlashcardFeature {
    public readonly store = inject(DataAccessFlashcardStore);
}
