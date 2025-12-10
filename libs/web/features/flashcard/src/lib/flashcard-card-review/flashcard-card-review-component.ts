import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { DataAccessFlashcardStore } from '@ecosystem/data-access-flashcard';
import { ButtonComponent, TagComponent } from '@ecosystem/web-shared-ui';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FlashcardRequest } from '@ecosystem/api-interfaces';

@Component({
  selector: 'flashcard-card-review',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzDescriptionsModule,
    NzInputModule,
    NzIconModule,
    NzFlexModule,
    NzCardModule,

    ButtonComponent,
    TagComponent,
    NzFormModule
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
  _id: string | null = null;

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    word: this.fb.control('', [Validators.required]),
  });

  compare(): boolean {
    if (this.value.trim().toLowerCase() ===  this.store.flashcard.data().word.toLowerCase()) {
      this.status = '';
      this.isCorrect.set(true)
      return true
    } else {
      this.status = 'error';
      return false
    }
  }

  nextFlashcard() {
    if (this.compare() ) {
       this.value = '';
    this.status = '';
    this.isCorrect.set(false);
    const req: FlashcardRequest = {
      _id: this.store.flashcard().data._id,
      neededHelp: this.neededHelp,
    }
    this.store.loadFlashcardOfTheDay(req);
    this.neededHelp = false
    }
   

  }

  hint() {
    this.value = this.store.flashcard().data.word;
    this.neededHelp = true
  }
}
