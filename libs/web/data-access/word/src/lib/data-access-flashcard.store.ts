import { inject } from "@angular/core";
import { FlashcardDto, FlashcardResponse } from "@ecosystem/api-interfaces";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { lastValueFrom } from "rxjs";
import { DataAccessWordService } from "./data-access-word.service";

export interface FlashcardStateModel {
      flashcard: {
            id?: string | null;
            data: FlashcardDto;
            isLoading?: boolean;
        }
}

const initialState: FlashcardStateModel = {
    flashcard: { 
        id: null,
        data: {} as FlashcardDto,
        isLoading: false
    }
}

export const DataAccessFlashcardStore = signalStore(
       { providedIn: 'root' },
        withState(initialState),
        withMethods((store, service = inject(DataAccessWordService)) => ({
              async loadFlashcardOfTheDay(id: string | null = null) {
                        patchState(store, { flashcard: { ...store.flashcard(), isLoading: true, id } } );
                        try {
                            const res$ = service.flashcardOfTheDay(id);
                            const res: FlashcardResponse  = await lastValueFrom(res$);
                            patchState(store, { flashcard: { ...store.flashcard(), isLoading: false, data: res.data as FlashcardDto || null}});
                        } catch (error) {
                            patchState(store, { flashcard: { ...store.flashcard(), isLoading: false, data: {} as FlashcardDto}});
                    }
         }})
    ),
    withHooks({
        onInit(store) {
            store.loadFlashcardOfTheDay(null); // Load initial vocabulary list
        }
    })
);

// export const DataAccessFlashcardStore = signalStore( --- IGNORE ---
//        { providedIn: 'root
