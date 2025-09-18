
export class WordSentence {
  sentence!: string;
  pronunciation?: string;
  meaning!: string;
}

export class WordDto {
  _id!: string
  languageCode!: string; // ISO code like 'en', 'jp'
  word!: string;
  translation!: string;
  meaning!: string;
  ipa!: string
  pronunciation?: string;
  level?: string;
  partsOfSpeech?: string[];
  tags?: string[];
  examples!: WordSentence[];
  creationDate?: Date;
  reviewedAt?: Date;

  // flashcard properties
  repetition?: number;
  nextReviewDate?: Date;
}