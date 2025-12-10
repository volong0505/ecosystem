import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpsertWordRequest, Definition } from '@ecosystem/api-interfaces';
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
import { WordCategoriesStore } from '@ecosystem/share-store';

const categoryOptions = WordCategoriesStore;
interface WordDefinition extends Definition {
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
    FormsModule
  ],
  templateUrl: './vocabulary-tracker-drawer-component.html',
  styleUrl: './vocabulary-tracker-drawer-component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,

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

  definitions: WordDefinition[] = [];

  detail = this.store.detail().data;

  partsOfSpeechOptions = [
    { label: 'Noun', value: 'noun' },
    { label: 'Verb', value: 'verb' },
    { label: 'Adjective', value: 'adjective' },
    { label: 'Adverb', value: 'adverb' },
    { label: 'Phrasal verb', value: 'phrasal verb'},
    { label: 'Idiom', value: 'idiom'},
    { label: 'Pronoun', value: 'pronoun' },
    { label: 'Preposition', value: 'preposition' },
    { label: 'Conjunction', value: 'conjunction' },
    { label: 'Interjection', value: 'interjection' },
  ];

  categoryOptions = signal(categoryOptions.map(t => t));

  validateForm = this.fb.group({
    word: this.fb.control('', [Validators.required]),
    translation: this.fb.control(''),
    ipa: this.fb.control('', [Validators.required]),
    level: this.fb.control(''),
    partOfSpeech: this.fb.control('', [Validators.required]),
    usageNote: this.fb.control(''),
  });

  askAIForm = this.fb.group({
    word: this.fb.control(''),
  });

  constructor() { 
   effect(() => {
       this.validateForm.patchValue({
        word: this.detail?.word,
        translation: this.detail?.translation,
        level: this.detail?.level,
        partOfSpeech: this.detail?.partOfSpeech,
        ipa: this.detail?.ipa,
        usageNote: this.detail?.usageNote,
      });

      this.definitions = this.detail?.definitions.map((def: any, index: number) => ({
        id: index + 1,
        translation: def.translation,
        explanation: def.explanation,
        example: def.example,
        exampleVi: def.exampleVi,
        note: def.note
      })) || [];
    });

  }

  close() {
    this.visible = false
  }

  // ngOnDestroy() {
  //   this.validateForm.reset(); // 🧹 Clear form value
  //   this.askAIForm.reset(); // 🧹 Clear AI form value
  //   this.definitions = []; // 🧹 Clear definitions
  // }

  submitForm() {
    if (this.validateForm.valid) {
      const request: UpsertWordRequest = {
        _id: this.detail?._id || null,
        ...this.validateForm.value,
        word: this.validateForm.value.word || '',
        partOfSpeech: this.validateForm.value.partOfSpeech || '',
        languageCode: 'en', // Assuming 'en' as default language code, can be changed as needed
        usageNote: this.validateForm.value.usageNote || '',
        definitions: this.definitions.map(def => ({
          translation: def.translation,
          explanation: def.explanation,
          example: def.example,
          exampleVi: def.exampleVi,
          note: def.note
        }))
      };


      this.store.upsertWord(request).then(() => {
        this.close();
      });
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  addDefinition(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.definitions.length > 0 ? this.definitions[this.definitions.length - 1].id + 1 : 1;

    const control = {
      id,
      translation: '',
      explanation: '',
      example: '',
      exampleVi: '',
      note: ''
    };
    this.definitions.push(control);
  }

  async generateWord(word: string) {
    this.isSpinning = true;
    const data = await this.store.getWordFromAI(word)

    if (data) {
      this.validateForm.patchValue({
        word: data.word,
        translation: data.translation,
        level: data.level,
        partOfSpeech: data.partOfSpeech,
        ipa: data.ipa,
      });

      this.definitions = data.definitions.map((def: any, index: number) => ({
        id: index + 1,
        translation: def.translation,
        explanation: def.explanation,
        example: def.example,
        exampleVi: def.exampleVi
      }));

      this.isExisted = data.isExisted,
      this.isSpinning = false;
    }
  }

  onAskAi() {
    const word = this.askAIForm.get('word')?.value as string;
    this.generateWord(word)
  }

  removeDefinition(id: number) {
    this.definitions = this.definitions.filter(s => s.id !== id);
  }

  // handleClose(removedTag: {}): void {
  //   this.tag = this.tag.filter(tag => tag !== removedTag);
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

  //   if (this.inputValue && this.tag.indexOf(this.inputValue) === -1) {
  //     this.tag = [...this.tag, this.inputValue];
  //   }
  //   this.inputValue = '';
  //   this.inputVisible = false;
  // }
}
