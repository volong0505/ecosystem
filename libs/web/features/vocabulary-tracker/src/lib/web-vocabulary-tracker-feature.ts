import { Component } from '@angular/core';
import { VocabularyTrackerDrawerComponent } from './vocabulary-tracker-drawer/vocabulary-tracker-drawer-component';
import { VocabularyTrackerTableComponent } from './vocabulary-tracker-table/vocabulary-tracker-table-component';

@Component({
  selector: 'vocabulary-tracker-feature',
  imports: [ 
    VocabularyTrackerDrawerComponent,
    VocabularyTrackerTableComponent
  ],
  templateUrl: './web-vocabulary-tracker-feature.html',
  styleUrl: './web-vocabulary-tracker-feature.css',
})
export class WebVocabularyTrackerFeature {}
