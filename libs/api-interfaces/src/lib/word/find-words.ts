import { Definition } from "./word.dto";

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
    translation!: string;
    ipa!: string;
    level?: string;
    partOfSpeech?: string;
    definitions!: Definition[] | [];
}


export class FindWordsResponse {
    data!: WordsItem[];
    total!: number
}