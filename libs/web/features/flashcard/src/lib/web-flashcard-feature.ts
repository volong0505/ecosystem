import { Component, signal } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FlashcardDto } from '@ecosystem/api-interfaces';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TagComponent } from '@ecosystem/web-shared-ui';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'web-flashcard-web-flashcard-feature',
  imports: [
    FormsModule,
    NzCardModule,
    NzDescriptionsModule,
    NzInputModule,
    NzIconModule,
    NzFlexModule,

    TagComponent
  ],
  templateUrl: './web-flashcard-feature.html',
  styleUrl: './web-flashcard-feature.css',
})
export class WebFlashcardFeature {

  value: string = '';
  status: 'error' | 'warning' | ''	= '';
  isCorrect = signal(false);

  word: FlashcardDto = {
    id: 'demo',
    word: "Desperate",
    translation: "Tuyệt vọng",
    meaning: 'Feeling or showing a hopeless sense that a situation is so bad as to be impossible to deal with.',
    ipa: 'ˈdɛsp(ə)rət',
    pronunciation: 'DES-puh-ruht',
    level: 'B2',
    partsOfSpeech: ['adjective'],
    tags: ['common', 'exam'],
    examples: [
      {
        sentence: 'The situation is desperate.',
        meaning: 'Tình hình thật tuyệt vọng.',
      },
      {
        sentence: 'They made a desperate attempt to escape.',
        meaning: 'Họ đã có một nỗ lực tuyệt vọng để thoát thân.',
      }
    ]
  };

  compare() {
    if (this.value.trim().toLowerCase() === this.word.word.toLowerCase()) {
      this.status = '';
      this.isCorrect.set(true)
    } else {
      this.status = 'error';
    }
  }
}
