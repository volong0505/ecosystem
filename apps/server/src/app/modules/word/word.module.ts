import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Word, WordSchema } from "@ecosystem/infra-database";
import { WordService } from "./word.service";
import { WordController } from "./word.controller";
import { GeminiModule } from "../gemeni";
import { WordRepository } from "./word.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Word.name, schema: WordSchema },
        ]),
        GeminiModule
    ],
    controllers: [WordController],
    providers: [
        WordService,
        WordRepository
    ],
    exports: []
})
export class WordModule { }