# check it out "https://nx.dev/technologies/angular/api/generators/library#examples"

npx nx g @nx/angular:library libs/web/features/shell/ --name=web-shell-feature --tags=feature --skipModule --prefix=web-shell --flat --dryRun

npx nx g @nx/angular:library libs/web/features/calendar/ --name=web-calendar-feature --tags=feature --skipModule --prefix=web-calendar --flat --dryRun 

npx nx g @nx/angular:library libs/web/data-access/event/ --name=data-access-event --tags=data-access --skipModule --prefix=data-access-event --flat --dryRun

npx nx g @nx/angular:library libs/web/utils/ --name=web-utils --tags=util --skipModule --prefix=web-utils --flat --dryRun
npx nx g @nx/angular:library libs/web/_shared/ui/ --name=web-shared-ui --tags=shared --skipModule --prefix=web-shared-ui --flat --dryRun

npx nx g @nx/angular:library libs/web/features/vocabulary-tracker/ --name=web-vocabulary-tracker-feature --tags=feature --skipModule --prefix=web-vocabulary-tracker --flat

npx nx g @nx/angular:library libs/web/data-access/word/ --name=data-access-word --tags=data-access --skipModule --prefix=data-access-word --flat

npx nx g @nx/angular:library libs/web/features/langluage-learning/ --name=web-language-learning-feature --tags=feature --skipModule --prefix=web-language-learning --flat
npx nx g @nx/angular:library libs/web/features/flashcard/ --name=web-flashcard-feature --tags=feature --skipModule --prefix=web-flashcard --flat
