import { CreateWordRequest, CreateWordResponse, FindWordRequest, FindWordResponse, FindWordsRequest, FindWordsResponse, WordsItem } from "@ecosystem/api-interfaces";
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
        meaning: geminiResponse.meaning,
        ipa: geminiResponse.ipa,
        pronunciation: geminiResponse.pronunciation,
        level: geminiResponse.level,
        partsOfSpeech: geminiResponse.partsOfSpeech,
        category: geminiResponse.category,
        examples: geminiResponse.examples,
        related_words: geminiResponse.related_words,
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
            _id: item._id.toString(),
            word: item.word,
            meaning: item.meaning,
            ipa: item.ipa,
            level: item.level,
            partsOfSpeech: item.partsOfSpeech,
            translation: item.translation,
            pronunciation: item.pronunciation || '',
            category: item.category,
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
                languageCode: word.languageCode,
                word: word.word,
                meaning: word.meaning,
                ipa: word.ipa,
                level: word.level,
                partsOfSpeech: word.partsOfSpeech,
                translation: word.translation,
                pronunciation: word.pronunciation,
                category: word.category,
                examples: word.examples || [],
            } : null
        }
    }

  
    async findByWord(value: string): Promise<FindWordResponse> {
        const word = await this.repository.findByWord(value);
        return {
            data: word ? {
                _id: word._id.toString(),
                languageCode: word.languageCode,
                word: word.word,
                meaning: word.meaning,
                ipa: word.ipa,
                level: word.level,
                partsOfSpeech: word.partsOfSpeech,
                translation: word.translation,
                pronunciation: word.pronunciation,
                category: word.category,
                examples: word.examples || [],
            } : null
        }
    }
}

