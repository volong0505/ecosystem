import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateWordRequest, WordSentence } from '@ecosystem/api-interfaces';
import { DataAccessWordStore } from '@ecosystem/data-access-word';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
// import { WordTagsStore } from '@ecosystem/share-store';
interface WordSentenceExample extends WordSentence {
  id: number;
}

@Component({
  selector: 'vocabulary-tracker-drawer-component',
  imports: [
    NzDrawerModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzTypographyModule,
    NzSelectModule,
    NzButtonModule,
    NzDividerModule,
    NzSpinModule,
    NzTagModule,
    NzAlertModule,

    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  templateUrl: './vocabulary-tracker-drawer-component.html',
  styleUrl: './vocabulary-tracker-drawer-component.css',
})
export class VocabularyTrackerDrawerComponent {
  private fb = inject(NonNullableFormBuilder);
  public readonly store = inject(DataAccessWordStore);

  isSpinning = false;
  visible = true;

  inputVisible = false;
  inputValue = '';
  isExisted =  {
    status: false
  }

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  examples: WordSentenceExample[] = [];

  detail = this.store.detail.data();

  partsOfSpeechOptions = [
    { label: 'Noun', value: 'noun' },
    { label: 'Verb', value: 'verb' },
    { label: 'Adjective', value: 'adjective' },
    { label: 'Adverb', value: 'adverb' },
    { label: 'Pronoun', value: 'pronoun' },
    { label: 'Preposition', value: 'preposition' },
    { label: 'Conjunction', value: 'conjunction' },
    { label: 'Interjection', value: 'interjection' },
    { label: 'Phrasal verb', value: 'phrasal verb'}
  ];

  tagOptions = [];

  validateForm = this.fb.group({
    word: this.fb.control('', [Validators.required]),
    pronunciation: this.fb.control(''),
    translation: this.fb.control(''),
    meaning: this.fb.control(''),
    level: this.fb.control(''),
    partsOfSpeech: this.fb.control<string[]>([]),
    ipa: this.fb.control(''),
    tags: this.fb.control(''),
  });

  askAIForm = this.fb.group({
    word: this.fb.control(''),
  });


  constructor() { 
    console.log(this.tagOptions)
   effect(() => {
       this.validateForm.patchValue({
        word: this.detail?.word,
        pronunciation: this.detail?.pronunciation || '',
        translation: this.detail?.translation,
        meaning: this.detail?.meaning,
        level: this.detail?.level,
        partsOfSpeech: this.detail?.partsOfSpeech || [],
        ipa: this.detail?.ipa,
        tags: this.detail?.tags || '',
      });

      this.examples = this.detail?.examples.map((sentence: any, index: number) => ({
        id: index + 1,
        sentence: sentence.sentence,
        meaning: sentence.meaning,
        pronunciation: sentence.pronunciation
      })) || [];
    });
  
  }

  close() {
    this.visible = false
  }

  ngOnDestroy() {
    this.validateForm.reset(); // 🧹 Clear form value
    this.askAIForm.reset(); // 🧹 Clear AI form value
    this.examples = []; // 🧹 Clear examples
  }

  submitForm() {
    if (this.validateForm.valid) {
      const request: CreateWordRequest = {
        ...this.validateForm.value,
        word: this.validateForm.value.word || '',
        languageCode: 'en', // Assuming 'en' as default language code, can be changed as needed
        tags: this.validateForm.value.tags || '',
        examples: this.examples.map(example => ({
          sentence: example.sentence,
          pronunciation: example.pronunciation,
          meaning: example.meaning
        }))
      };

      this.store.createVocabulary(request).then(() => {
        this.close();
      });
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  addSentence(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.examples.length > 0 ? this.examples[this.examples.length - 1].id + 1 : 1;

    const control = {
      id,
      sentence: '',
      meaning: '',
      pronunciation: '',
    };
    this.examples.push(control);
  }

  async generateWord(word: string) {
    this.isSpinning = true;
    const data = await this.store.getWordFromAI(word)

    if (data) {
      this.validateForm.patchValue({
        word: data.word,
        pronunciation: data.pronunciation,
        translation: data.translation,
        meaning: data.meaning,
        level: data.level,
        partsOfSpeech: data.partsOfSpeech,
        ipa: data.ipa,
        tags: data.tags,
      });

      this.examples = data.examples.map((sentence: any, index: number) => ({
        id: index + 1,
        sentence: sentence.sentence,
        meaning: sentence.meaning,
        pronunciation: sentence.pronunciation
      }));

      this.isExisted = data.isExisted,
      this.isSpinning = false;
    }
  }

  onAskAi() {
    const word = this.askAIForm.get('word')?.value as string;
    this.generateWord(word)
  }

  removeSentece(id: number) {
    this.examples = this.examples.filter(s => s.id !== id);
  }

  // handleClose(removedTag: {}): void {
  //   this.tags = this.tags.filter(tag => tag !== removedTag);
  // }

  // sliceTagName(tag: string): string {
  //   const isLongTag = tag.length > 20;
  //   return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  // }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  // handleInputConfirm(): void {

  //   if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
  //     this.tags = [...this.tags, this.inputValue];
  //   }
  //   this.inputValue = '';
  //   this.inputVisible = false;
  // }
}
