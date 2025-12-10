
export class Definition {
  translation!: string;
  explanation?: string;
  example!: string;
  exampleVi!: string;
  note!: string;
}

export class WordDto {
  _id!: string
  languageCode!: string; // ISO code like 'en', 'jp'
  word!: string;
  translation!: string;
  ipa!: string
  level!: string;
  partOfSpeech!: string;
  usageNote!: string;
  definitions!: Definition[]
  creationDate?: Date;
  reviewedAt?: Date;

  // flashcard properties
  repetition?: number;
  nextReviewDate?: Date;
}