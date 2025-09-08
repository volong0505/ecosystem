import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WebFlashcardFeature } from '@ecosystem/web-flashcard-feature';
import { WebVocabularyTrackerFeature } from '@ecosystem/web-vocabulary-tracker-feature';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'web-language-learning',
  imports: [
    CommonModule,
    NzTabsModule,

    WebVocabularyTrackerFeature,
    WebFlashcardFeature,

  ],
  templateUrl: './web-language-learning-feature.html',
  styleUrl: './web-language-learning-feature.css',
})
export class WebLanguageLearningFeature {
  constructor() {
  }
    tabs = [
    {
      title: 'Vocabulary Tracker',
      link: 'vocabulary-tracker'
    },
    {
      title: 'Flashcard',
      link: 'flashcard'
    }
  ]
}