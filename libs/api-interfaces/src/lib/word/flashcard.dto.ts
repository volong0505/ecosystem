import { WordSentence } from "./word.dto";

export class FlashcardRequest {
    id?: string;
    neededHelp?: boolean
}

export class FlashcardDto {
    id!: string;
    word!: string;
    translation!: string;
    meaning!: string;
    ipa!: string
    pronunciation?: string;
    level?: string;
    partsOfSpeech?: string[];
    tags?: string[];
    examples!: WordSentence[];
    alreadyLearned!: boolean;
}

export class FlashcardResponse {
    data!: FlashcardDto
}