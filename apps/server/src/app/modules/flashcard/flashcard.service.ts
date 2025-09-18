import { FlashcardRequest, FlashcardResponse, FlashcardDto } from "@ecosystem/api-interfaces";
import { Injectable } from "@nestjs/common";
import { FlashcardRepository } from "./flashcard.repository";

@Injectable()
export class FlashcardService {

    constructor(
        private readonly repository: FlashcardRepository
    ) {}

    async flashcard(params: FlashcardRequest): Promise<FlashcardResponse> {
            if (params.id) {
                await this.updateFlashcard(params);
            }
            const word = await this.repository.getWordToReview();

            return {
                data: word ? {
                    id: word._id.toString(),
                    word: word.word,
                    translation: word.translation,
                    meaning: word.meaning,
                    ipa: word.ipa,
                    pronunciation: word.pronunciation,
                    level: word.level,
                    partsOfSpeech: word.partsOfSpeech,
                    tags: word.tags,
                    examples: word.examples || [],
                    alreadyLearned: word.repetition >= 1
                } : {} as FlashcardDto
            }
    }

    async updateFlashcard(params: FlashcardRequest) {
        
        const { id, neededHelp} = params;
        const reviewedAt = new Date()
        const word = await this.repository.findOne(id as string);
        if (!word)
            return;

        let repetition = word.repetition | 0;
        if (neededHelp && neededHelp.toString() == 'true') {
            console.log(typeof(neededHelp))
            repetition = 0;
        }
        const nextReviewDate = this.getNextReviewDate(repetition);
        repetition++;
        return this.repository.update(word._id, reviewedAt, repetition, nextReviewDate )
    }

    getNextReviewDate(repetition: number): Date {
            const now = new Date();

            switch (repetition) {
                case 0: return new Date(now.setMinutes(now.getMinutes() + 1));
                case 1: return new Date(now.setMinutes(now.getMinutes() + 2));
                case 2: return new Date(now.setMinutes(now.getMinutes() + 5));
                case 3:
                    return new Date(now.setMinutes(now.getMinutes() + 7));
                case 4:
                    return new Date(now.setDate(now.getDate() + 1));
                case 5:
                    return new Date(now.setDate(now.getDate() + 2));
                case 6:
                    return new Date(now.setDate(now.getDate() + 3));
                case 7:
                    return new Date(now.setDate(now.getDate() + 4));
                default: 
                    return new Date(now.setDate(now.getDate() + 5));
        }
    }
}