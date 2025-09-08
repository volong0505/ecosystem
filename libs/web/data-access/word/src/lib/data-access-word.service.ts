import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_ROUTES, CreateWordRequest, CreateWordResponse, FindWordResponse, FindWordsRequest, FindWordsResponse, FlashcardResponse } from "@ecosystem/api-interfaces";
import { Observable } from "rxjs";

const apiRoutes = API_ROUTES.WORD;

@Injectable({ providedIn: 'root' },)
export class DataAccessWordService {

    private readonly http = inject(HttpClient);

    getWordFromAI(word: string): Observable<any> {
        const params = new HttpParams().set('word', word);
        return this.http.get(apiRoutes.GENERATE_BY_AI, { params })
    }

    // Example method to fetch vocabulary list
    getVocabularyList(req: FindWordsRequest): Observable<FindWordsResponse> {
        const { keyword = '', page = 1} = req;

        const params = new HttpParams()
            .set('keyword', keyword)
            .set('page', page)
        return this.http.get<FindWordsResponse>(apiRoutes.FIND_ALL, { params: params })
    }

    getOne(id: string): Observable<FindWordResponse> {
        const params = new HttpParams()
            .set('id', id)
        return this.http.get<FindWordResponse>(apiRoutes.FIND_ONE, { params: params });
    } 

    // Example method to add a new word
    createVocabulary(dto: CreateWordRequest): Observable<CreateWordResponse> {
        return this.http.post<CreateWordResponse>(apiRoutes.CREATE, dto)
        // Logic to add a new word to the vocabulary list
    }

    flashcardOfTheDay(id: string | null): Observable<FlashcardResponse> {
        const params = new HttpParams()
            .set('id', id || '');
        return this.http.get<FlashcardResponse>(apiRoutes.FLASHCARD, {params: params});
    }
}