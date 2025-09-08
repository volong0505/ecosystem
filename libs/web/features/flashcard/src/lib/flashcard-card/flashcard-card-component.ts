
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataAccessFlashcardStore } from '@ecosystem/data-access-word';
import { TagComponent } from '@ecosystem/web-shared-ui';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button'
@Component({
  selector: 'flashcard-card-component',
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzDescriptionsModule,
    NzInputModule,
    NzIconModule,
    NzFlexModule,
    NzButtonModule,

    TagComponent
  ],
  templateUrl: './flashcard-card-component.html',
  styleUrl: './flashcard-card-component.css',
})
export class FlashcardCardComponent {

   public readonly store = inject(DataAccessFlashcardStore);

  value: string = '';
  status: 'error' | 'warning' | ''	= '';
  isCorrect = signal(false);

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
    this.store.loadFlashcardOfTheDay( this.store.flashcard.data().id || null);
  }
}
