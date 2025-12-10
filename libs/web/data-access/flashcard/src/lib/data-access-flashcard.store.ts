import { inject } from "@angular/core";
import { FlashcardDto, FlashcardRequest, FlashcardResponse } from "@ecosystem/api-interfaces";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { lastValueFrom } from "rxjs";
import { DataAccessFlashcardService } from "./data-access-flashcard.service";

export interface FlashcardStateModel {
      flashcard: {
            _id?: string | null;
            data: FlashcardDto;
            isLoading?: boolean;
        }
}

const initialState: FlashcardStateModel = {
    flashcard: { 
        _id: null,
        data: {} as FlashcardDto,
        isLoading: false
    }
}

export const DataAccessFlashcardStore = signalStore(
       { providedIn: 'root' },
        withState(initialState),
        withMethods((store, service = inject(DataAccessFlashcardService)) => ({
              async loadFlashcardOfTheDay(req: FlashcardRequest) {
                        patchState(store, { flashcard: { ...store.flashcard(), isLoading: true, _id: req._id } } );
                        try {
                            const res$ = service.flashcardOfTheDay(req);
                            const res: FlashcardResponse  = await lastValueFrom(res$);
                            patchState(store, { flashcard: { ...store.flashcard(), isLoading: false, data: res.data as FlashcardDto || null}});
                        } catch (error) {
                            patchState(store, { flashcard: { ...store.flashcard(), isLoading: false, data: {} as FlashcardDto}});
                    }
         }})
    ),
    withHooks({
        onInit(store) {
            store.loadFlashcardOfTheDay({}); // Load initial vocabulary list
        }
    })
);

