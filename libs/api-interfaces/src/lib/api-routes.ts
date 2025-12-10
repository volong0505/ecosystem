
export const API_ROUTES = {
    EVENT: {
        FIND_ALL: 'events/find-all',
        FIND_ONE: 'events/find-one',
        CREATE: 'events/create',
        UPDATE: 'events/update',
        DELETE: 'events/delete',   
    },
    WORD: {
        FIND_ALL: 'word/find-all',
        FIND_ONE: 'word/find-one',
        UPSERT: 'word/upsert',
        DELETE: 'word/delete',   
        GENERATE_BY_AI: 'word/generate-by-ai',
        FLASHCARD: 'word/flashcard',
    },
    FLASHCARD: {
        GET_FLASHCARD: 'flashcard/get',
    }
}