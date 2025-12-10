import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_ROUTES, FlashcardRequest, FlashcardResponse } from "@ecosystem/api-interfaces";
import { Observable } from "rxjs";

const apiRoutes = API_ROUTES.FLASHCARD;

@Injectable({ providedIn: 'root' },)
export class DataAccessFlashcardService { 

    private readonly http = inject(HttpClient);
    
     flashcardOfTheDay(req: FlashcardRequest): Observable<FlashcardResponse> {
        const params = new HttpParams()
            .set('_id', req._id || '')
            .set('neededHelp', req.neededHelp || false)
        return this.http.get<FlashcardResponse>(apiRoutes.GET_FLASHCARD, {params: params});
    }

}