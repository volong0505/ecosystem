import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataAccessFlashcardStore } from '@ecosystem/data-access-flashcard';
import { ButtonComponent, TagComponent } from '@ecosystem/web-shared-ui';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'flashcard-card-study',
  imports: [
      CommonModule,
    NzDescriptionsModule,
    NzIconModule,
    NzFlexModule,
    NzCardModule,

    ButtonComponent,
    TagComponent
  ],
  templateUrl: './flashcard-card-study-component.html',
  styleUrl: './flashcard-card-study-component.css',
})
export class FlashcardCardStudyComponent {
  public readonly store = inject(DataAccessFlashcardStore);

  _id: string | null = null;

  nextFlashcard() {
    const req = {
      _id: this.store.flashcard.data()._id
    }
    this.store.loadFlashcardOfTheDay(req);
  }
}
