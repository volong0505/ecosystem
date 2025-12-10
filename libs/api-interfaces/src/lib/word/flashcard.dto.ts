import { Definition } from "./word.dto";

export class FlashcardRequest {
    _id?: string;
    neededHelp?: boolean
}

export class FlashcardDto {
    _id!: string;
    word!: string;
    translation!: string;
    ipa!: string
    level?: string;
    usageNote?: string;
    partOfSpeech: string;
    definitions!: Definition[]; 
    alreadyLearned!: boolean;
}

export class FlashcardResponse {
    data!: FlashcardDto
}