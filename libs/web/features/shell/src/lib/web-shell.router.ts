import { Route } from "@angular/router";
import { LayoutComponent } from "./layout/layout-component";

export const webShellRoutes: Route[] = [
    { 
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '', redirectTo: 'calendar', pathMatch: 'full'
            },
            {
                path: 'calendar',
                loadComponent: () => import('@ecosystem/web-calendar-feature').then(c => c.WebCalendarFeature)
            },
            {
                path: 'language-learning',
                loadComponent: () => import('@ecosystem/web-language-learning-feature').then(c => c.WebLanguageLearningFeature)
            }
        ]
    }
]