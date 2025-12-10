import { UpsertWordRequest, UpsertWordResponse, FindWordRequest,
    FindWordResponse, FindWordsRequest, FindWordsResponse, WordsItem } from "@ecosystem/api-interfaces";
import { Injectable } from "@nestjs/common";
import { GeminiService } from "../gemeni/gemini.service";
import { WordRepository } from "./word.repository";

@Injectable()
export class WordService {
  constructor (
    private readonly repository: WordRepository,
    private readonly geminiService: GeminiService,
  ) {}

    async generateWord(text: string) {
        // Call Gemini service to get Word details
        const geminiResponse = await this.geminiService.generateWordDetail(text);
        const word: FindWordResponse = await this.findByWord(text)
        const existed = word.data && (geminiResponse.word).toLowerCase() == (word.data.word).toLowerCase() ?
            {
                status: true,
                word: word.data.word,
                translation: word.data.translation,
            } : {
                status: false,
                word: null,
                translation: null
            }
        // Process the response and return it
        return {
        languageCode: 'en',
        word: geminiResponse.word,
        translation: geminiResponse.translation,
        ipa: geminiResponse.ipa,
        level: geminiResponse.level,
        partOfSpeech: geminiResponse.partOfSpeech,
        usageNote: geminiResponse.usageNote,
        definitions: geminiResponse.definitions,
        isExisted: existed
        };
    }

    async findAll(req: FindWordsRequest): Promise<FindWordsResponse> {
        // Fetch the Word list from the repository
        const params = {
            languageCode: 'en',
            sortField: 'creationDate',
            sortOrder: '-1',
            keyword: req.keyword || '',
            page: req.page,
        }

        const [rawData, total] = await Promise.all([
            this.repository.findAllByLanguage(params),
            this.repository.countTotal(params)
        ])

        const data: WordsItem[] = rawData.map(item => ({
            _id: item._id,
            word: item.word,
            translation: item.translation,
            ipa: item.ipa,
            level: item.level,
            partOfSpeech: item.partOfSpeech,
            definitions: item.definitions || []
        }));        
        // Return the Word list
        return {
            data,
            total
        };
    } 

    async upsert(vocab: UpsertWordRequest): Promise<UpsertWordResponse> {
        // Create a new Word entry using the repository
        const word = await this.repository.upsert(vocab);
        
        // Return the created Word entry
        return {
            success: true,
            message: 'Word created successfully',
            data: word,
        };
    }

    async findOne(params: FindWordRequest): Promise<FindWordResponse> {
        const word = await this.repository.findOne(params.id);
        return {
            data: word ? {
                _id: word._id,
                languageCode: word.languageCode,
                word: word.word,
                translation: word.translation,
                ipa: word.ipa,
                level: word.level,
                partOfSpeech: word.partOfSpeech,
                usageNote: word.usageNote,
                definitions: word.definitions || [],
            } : null
        }
    }

  
    async findByWord(value: string): Promise<FindWordResponse> {
        const word = await this.repository.findByWord(value);
        return {
            data: word ? {
                _id: word._id,
                languageCode: word.languageCode,
                word: word.word,
                translation: word.translation,
                ipa: word.ipa,
                level: word.level,
                partOfSpeech: word.partOfSpeech,
                usageNote: word.usageNote,
                definitions: word.definitions || [],
            } : null
        }
    }
}

