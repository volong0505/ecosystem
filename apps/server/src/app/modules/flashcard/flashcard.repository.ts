import { Word } from "@ecosystem/infra-database";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class FlashcardRepository {

    constructor(
        @InjectModel(Word.name)
        private readonly model: Model<Word>,
    ) { }

    async update(id: Types.ObjectId, reviewedAt: Date, repetition: number, nextReviewDate: Date): Promise<Word | null> {
        return await this.model.findByIdAndUpdate(new Types.ObjectId(id), { reviewedAt, repetition, nextReviewDate }).exec();
    }

    findOne(id: string): Promise<Word | null> {
        const _id = new Types.ObjectId(id)
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