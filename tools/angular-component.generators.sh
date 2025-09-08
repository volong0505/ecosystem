# check it out "https://nx.dev/technologies/angular/api/generators/component"

npx nx g @nx/angular:component libs/web/features/shell/src/lib/layout/layout-component --prefix=web-shell-layout --name=layout-component --export --dryRun

npx nx g @nx/angular:component libs/web/features/calendar/src/lib/calendar-month-view/calendar-month-view-component --prefix=calendar-month-view --name=calendar-month-view-component --export --dryRun

npx nx g @nx/angular:component libs/web/features/calendar/src/lib/calendar-event-tag/calendar-event-tag-component --prefix=calendar-event-tag --name=calendar-event-tag-component --export --dryRun
npx nx g @nx/angular:component libs/web/features/calendar/src/lib/calendar-event-popover/calendar-event-popover-component --prefix=calendar-event-popover --name=calendar-event-popover-component --export --dryRun

npx nx g @nx/angular:component libs/web/features/vocabulary-tracker/src/lib/vocabulary-tracker-table/vocabulary-tracker-table-component --prefix=vocabulary-tracker-table --name=vocabulary-tracker-table-component --export
npx nx g @nx/angular:component libs/web/features/vocabulary-tracker/src/lib/vocabulary-tracker-drawer/vocabulary-tracker-drawer-component --prefix=vocabulary-tracker-drawer --name=vocabulary-tracker-drawer-component --export

npx nx g @nx/angular:component libs/web/features/flashcard/src/lib/flashcard-card/flashcard-card-component --prefix=flashcard-card --name=flashcard-card-component --export
