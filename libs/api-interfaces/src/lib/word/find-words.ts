import { WordSentence } from "./word.dto";

export class FindWordsRequest {
    keyword?: string;
    languageCode?: string;
    sortField?: string;
    sortOrder?: string;
    page?: number;
}

export class WordsItem {
    _id!: string;
    word!: string;
    meaning!: string;
    ipa!: string;
    level?: string;
    partsOfSpeech?: string[];
    translation!: string;
    pronunciation!: string;
    category?: string;
    examples!: WordSentence[] | [];
}


export class FindWordsResponse {
    data!: WordsItem[];
    total!: number
}