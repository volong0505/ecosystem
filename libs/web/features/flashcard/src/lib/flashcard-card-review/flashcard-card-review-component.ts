import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataAccessFlashcardStore } from '@ecosystem/data-access-flashcard';
import { ButtonComponent, TagComponent } from '@ecosystem/web-shared-ui';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FlashcardRequest } from '@ecosystem/api-interfaces';

@Component({
  selector: 'flashcard-card-review',
  imports: [
    CommonModule,
    FormsModule,
    NzDescriptionsModule,
    NzInputModule,
    NzIconModule,
    NzFlexModule,
    NzCardModule,

    ButtonComponent,
    TagComponent
  ],
  templateUrl: './flashcard-card-review-component.html',
  styleUrl: './flashcard-card-review-component.css',
})
export class FlashcardCardReviewComponent {
  public readonly store = inject(DataAccessFlashcardStore);

  value: string = '';
  status: 'error' | 'warning' | ''	= '';
  isCorrect = signal(false);
  neededHelp: boolean = false;
  id: string | null = null;


  compare() {
    if (this.value.trim().toLowerCase() ===  this.store.flashcard.data().word.toLowerCase()) {
      this.status = '';
      this.isCorrect.set(true)
    } else {
      this.status = 'error';
    }
  }

  nextFlashcard() {
    this.value = '';
    this.status = '';
    this.isCorrect.set(false);
    const req: FlashcardRequest = {
      id: this.store.flashcard().data.id,
      neededHelp: this.neededHelp,
    }
    this.store.loadFlashcardOfTheDay(req);
    this.neededHelp = false

  }

  hint() {
    this.value = this.store.flashcard().data.word;
    this.neededHelp = true
  }
}
