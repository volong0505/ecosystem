import { Word } from "@ecosystem/infra-database";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class FlashcardRepository {

    constructor(
        @InjectModel(Word.name)
        private readonly model: Model<Word>,
    ) { }

    async update(_id: string, reviewedAt: Date, repetition: number, nextReviewDate: Date): Promise<Word | null> {
        return await this.model.findByIdAndUpdate(_id, { reviewedAt, repetition, nextReviewDate }).exec();
    }

    findOne(_id: string): Promise<Word | null> {
        return this.model.findById(_id).exec();
    }

    async getWordToReview(): Promise<Word> {
        return await this.model.find(
            {
                $or: [
                    { nextReviewDate: { $lte: new Date() } },
                    { repetition: null }
                ],
            }
        ).sort({ nextReviewDate: -1 }).limit(1).exec().then(words => words[0]);
    }
}