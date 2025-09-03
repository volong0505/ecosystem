import { Component } from '@angular/core';
import { CalendarMonthViewComponent } from './calendar-month-view/calendar-month-view-component';

@Component({
  selector: 'web-calendar-feature',
  imports: [
    CalendarMonthViewComponent
  ],
  templateUrl: './web-calendar-feature.html',
  styleUrl: './web-calendar-feature.css',
})
export class WebCalendarFeature {}
