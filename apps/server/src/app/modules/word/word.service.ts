import { Injectable } from "@nestjs/common";
import { GeminiService } from "../gemeni/gemini.service";
import { CreateWordRequest, CreateWordResponse, FindWordsRequest, FindWordsResponse, FindWordRequest, FindWordResponse, WordsItem } from "@ecosystem/api-interfaces";
import { WordRepository } from "./word.repository";

@Injectable()
export class WordService {
  constructor (
    private readonly repository: WordRepository,
    private readonly geminiService: GeminiService,
  ) {}

    async generateWord(word: string) {
        // Call Gemini service to get Word details
        const geminiResponse = await this.geminiService.generateWordDetail(word);
        
        // Process the response and return it
        return {
        languageCode: 'en',
        word: geminiResponse.word,
        translation: geminiResponse.translation,
        meaning: geminiResponse.meaning,
        ipa: geminiResponse.ipa,
        pronunciation: geminiResponse.pronunciation,
        level: geminiResponse.level,
        partsOfSpeech: geminiResponse.partsOfSpeech,
        tags: geminiResponse.tags,
        examples: geminiResponse.examples,
        };
    }

    async findAll(req: FindWordsRequest): Promise<FindWordsResponse> {
        // Fetch the Word list from the repository
        const params = {
            languageCode: 'en',
            sortField: 'createdAt',
            sortOrder: '-1',
            keyword: req.keyword || '',
            page: req.page,
        }

        const [rawData, total] = await Promise.all([
            this.repository.findAllByLanguage(params),
            this.repository.countTotal(params)
        ])

        const data: WordsItem[] = rawData.map(item => ({
            _id: item._id.toString(),
            word: item.word,
            meaning: item.meaning,
            ipa: item.ipa,
            level: item.level,
            partsOfSpeech: item.partsOfSpeech,
            translation: item.translation,
            pronunciation: item.pronunciation || '',
            tags: item.tags,
            examples: item.examples || [],
        }));        
        // Return the Word list
        return {
            data,
            total
        };
    } 

    async create(vocab: CreateWordRequest): Promise<CreateWordResponse> {
        // Create a new Word entry using the repository
        const newWord = await this.repository.create(vocab);
        
        // Return the created Word entry
        return {
            success: true,
            message: 'Word created successfully',
            data: {...newWord, _id: newWord._id.toString()},
        };
    }

    async findOne(params: FindWordRequest): Promise<FindWordResponse> {
        const word = await this.repository.findOne(params.id);
        return {
            data: word ? {
                _id: word._id.toString(),
                word: word.word,
                meaning: word.meaning,
                ipa: word.ipa,
                level: word.level,
                partsOfSpeech: word.partsOfSpeech,
                translation: word.translation,
                pronunciation: word.pronunciation,
                tags: word.tags,
                examples: word.examples || [],
            } : {}
        }
    }

    async flashcard(params: { learned_word_id?: string }) {
        if (params.learned_word_id) {
            await this.repository.updateReviewedAt(params.learned_word_id!);
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
            } : {}
        }
    }
}

