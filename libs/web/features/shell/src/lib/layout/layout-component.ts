import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shell-layout-component',
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule
  ],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css',
})
export class LayoutComponent {
  sidebarItem = [
    {
      label: 'Calendar', path: 'calendar', icon: 'calendar', exact: true, hidden: false
    },
    {
      label: 'Language', path: 'vocabulary-tracker', icon: 'translation', exact: true, hidden: false,
    },
    {
      label: 'Flashcard', path: 'flashcard', icon: 'book', exact: true, hidden: false,
    }
  ]

  isCollapsed = true;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
