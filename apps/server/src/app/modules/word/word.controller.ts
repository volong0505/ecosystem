import { Body, Controller, Get, Post, Query, ServiceUnavailableException } from "@nestjs/common";
import { API_ROUTES, CreateWordRequest, CreateWordResponse, FindWordRequest, FindWordResponse, FindWordsRequest, FindWordsResponse, FlashcardRequest, FlashcardResponse } from "@ecosystem/api-interfaces";
import { WordService } from "./word.service";

const routers = API_ROUTES.WORD;
@Controller()
export class WordController {
     constructor(
        private readonly service: WordService
    ) { }

    @Get(routers.GENERATE_BY_AI)
    async generateWord(@Query() req: { word: string }) {
        try {
            // Call the service to generate word details
            const wordDetails = await this.service.generateWord(req.word);

            // Return the generated word details
            return {
                success: true,
                data: wordDetails,
            }
        } catch (error) {
            // Handle any errors that occur during word generation
            throw new ServiceUnavailableException('Third-party service is unavailable');
        }
    }

    @Get(routers.FIND_ALL)
    async getVocabularyList(@Query() req: FindWordsRequest): Promise<FindWordsResponse> {
        const obj = JSON.parse(JSON.stringify(req)); // req.body = [Object: null prototype] { title: 'product' }
        const {data, total} = await this.service.findAll(obj);
        // Return the vocabulary list
        return {
            data,
            total,
        };
    }

    @Get(routers.FIND_ONE)
    async findOne(@Query() req: FindWordRequest): Promise<FindWordResponse> {
        return this.service.findOne(req)
    }

    @Post(routers.CREATE)
    createVocabulary(@Body() body: CreateWordRequest): Promise<CreateWordResponse> {
        // Call the service to create a new vocabulary entry
        return this.service.create(body);
    }

    @Get(routers.FLASHCARD)
    flashcardOfTheDay(@Query() req: FlashcardRequest): Promise<FlashcardResponse> {
        return this.service.flashcard(req);
    }
}