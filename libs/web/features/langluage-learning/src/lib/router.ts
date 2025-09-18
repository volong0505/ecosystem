import { Routes } from "@angular/router";

export const languageLearningRouter: Routes = [
    {
        path: 'vocabulary-tracker',
        loadComponent: () => import('@ecosystem/web-vocabulary-tracker-feature').then(c => c.WebVocabularyTrackerFeature)
    },
    {
        path: 'flashcard',
        loadComponent: () => import('@ecosystem/web-flashcard-feature').then(c => c.WebFlashcardFeature)
    }
]
