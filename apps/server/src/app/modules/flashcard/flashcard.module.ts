import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Word, WordSchema } from "@ecosystem/infra-database";
import { FlashcardController } from "./flashcard.controller";
import { GeminiModule } from "../gemeni";
import { FlashcardRepository } from "./flashcard.repository";
import { FlashcardService } from "./flashcard.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Word.name, schema: WordSchema },
        ]),
        GeminiModule
    ],
    controllers: [FlashcardController],
    providers: [
        FlashcardService,
        FlashcardRepository
    ],
    exports: []
})
export class FlashcardModule { }