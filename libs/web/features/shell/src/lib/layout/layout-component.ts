import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'shell-layout-component',
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzTabsModule
  ],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css',
})
export class LayoutComponent {
  tabs = [
    {
      label: 'Calendar', path: 'calendar', icon: 'calendar', exact: true, hidden: false
    },
    {
      label: 'Vocabulary Tracker', path: 'vocabulary-tracker', icon: 'translation', exact: true, hidden: false,
    },
     {
      label: 'Flashcards', path: 'flashcards', icon: 'translation', exact: true, hidden: false,
    },
  ]

  isCollapsed = true;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
