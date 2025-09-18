import { Controller, Get, Query } from "@nestjs/common";
import { FlashcardService } from "./flashcard.service";
import { API_ROUTES, FlashcardRequest, FlashcardResponse } from "@ecosystem/api-interfaces";

const routers = API_ROUTES.FLASHCARD;

@Controller() 
export class FlashcardController {
    
    constructor(
        private readonly service: FlashcardService
    ) {}

    @Get(routers.GET_FLASHCARD)
    flashcardOfTheDay(@Query() req: FlashcardRequest): Promise<FlashcardResponse> {
        return this.service.flashcard(req);
    }
}