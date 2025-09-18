import { inject } from '@angular/core';
import { FindWordResponse, FindWordsRequest, WordDto, WordsItem } from '@ecosystem/api-interfaces';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';
import { DataAccessWordService } from './data-access-word.service';

export interface WordStateModel {
    list: {
        data: WordsItem[];
        total: number;
        page: number;
        isLoading: boolean;
        errorMessage: string | null;
    }
    detail: {
        id: string | null;
        data: WordDto | null;
        isLoading: boolean;
    },
    drawer: {
        isOpen: boolean;
        isLoading: boolean;
        isCreating: boolean;
    }
}

const initialState: WordStateModel = {
    list: {
        data: [],
        total: 0,
        page: 1,
        isLoading: false,   
        errorMessage: null,
    },
    detail: {
        id: null,
        data: null,
        isLoading: false,
    },
    drawer: {
        isOpen: false,
        isLoading: false,
        isCreating: false
    }
}

export const DataAccessWordStore = signalStore(
       { providedIn: 'root' },
    withState(initialState),
    withMethods((store, service = inject(DataAccessWordService)) => ({
        async loadVocabularyList(req: FindWordsRequest) {
            
            patchState(store, { list: {...store.list(), page: req.page || 1, isLoading: true} });
            try {
                const res$ = service.getVocabularyList(req);
                const res = await lastValueFrom(res$);
                patchState(store, { list: {...store.list(), data: res.data, total: res.total,isLoading: false}});
            } catch (error) {
                patchState(store, { list: {...store.list(),  isLoading: false, errorMessage: 'Failed to load vocabulary list' }});
            }
        },
        async getWordFromAI(word: string) {
            patchState(store, { drawer: { ...store.drawer(), isLoading: true } });
            try {
                const res$ = service.getWordFromAI(word);
                const res = await lastValueFrom(res$);
                return res.data;
            } catch (error) {
                const errorMessage = typeof error === 'object' && error !== null && 'message' in error
                    ? String((error as { message?: unknown }).message)
                    : 'Failed to fetch word from AI';
                console.log('Error fetching word from AI:', errorMessage);
                patchState(store,  { drawer: { ...store.drawer(), isLoading: false } });
                throw error;
            } finally {
                patchState(store, { drawer: { ...store.drawer(), isLoading: false } });
            }
        },
        async createVocabulary(request: any) {
            patchState(store,  { drawer: { ...store.drawer(), isCreating: false } });
            try {
                const res$ = service.createVocabulary(request);
                await lastValueFrom(res$);
                const params = {
                    keyword: request.keyword || '',
                    page: store.list.page(),
                };
                this.loadVocabularyList(params); // Reload vocabulary list after creation
                this.closeDrawer();
            } catch (error) {
                patchState(store, { drawer: { ...store.drawer(), isCreating: false } });
            } finally {
                patchState(store,  { drawer: { ...store.drawer(), isCreating: false } });
            }
        },
        openDrawer() {
            patchState(store, { drawer: { ...store.drawer(), isOpen: true } })
        },
        closeDrawer() {
            patchState(store,{ drawer: { ...store.drawer(), isOpen: false } })
        },
        onEdit(id: string) {
            patchState(store, { drawer: { ...store.drawer(), isOpen: true },  detail: { ...store.detail(), id } } );
            this.loadOne(id);
        },
        async loadOne(id: string) {
            const res$ = service.getOne(id);
            const res: FindWordResponse  = await lastValueFrom(res$);
            patchState(store, { detail: { ...store.detail(), isLoading: false, data: res.data as WordDto || null}});
        },
    })
    ),
    withHooks({
        onInit(store) {
            store.loadVocabularyList({ keyword: '', page: store.list.page()}); // Load initial vocabulary list
        }
    }
    )
)