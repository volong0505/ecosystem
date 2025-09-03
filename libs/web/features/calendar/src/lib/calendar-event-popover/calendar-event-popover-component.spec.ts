import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarEventPopoverComponent } from './calendar-event-popover-component';

describe('CalendarEventPopoverComponent', () => {
  let component: CalendarEventPopoverComponent;
  let fixture: ComponentFixture<CalendarEventPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarEventPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
