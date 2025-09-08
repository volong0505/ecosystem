import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlashcardCardComponent } from './flashcard-card/flashcard-card-component';
@Component({
  selector: 'flashcard-feature',
  imports: [
    CommonModule,
    FlashcardCardComponent
  ],
  templateUrl: './web-flashcard-feature.html',
  styleUrl: './web-flashcard-feature.css',
})
export class WebFlashcardFeature {

}
