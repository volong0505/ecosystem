import { Component, effect, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DataAccessWordStore } from '@ecosystem/data-access-word';
import { ButtonComponent } from '@ecosystem/web-shared-ui';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@Component({
  selector: 'vocabulary-tracker-table-component',
  imports: [
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzFlexModule,
    NzDividerModule,
    NzPaginationModule,
    ReactiveFormsModule,

    ButtonComponent
  ],
  templateUrl: './vocabulary-tracker-table-component.html',
  styleUrl: './vocabulary-tracker-table-component.css',
})
export class VocabularyTrackerTableComponent {

  public readonly store = inject(DataAccessWordStore);
  private fb = inject(NonNullableFormBuilder);
  expandSet = new Set<string>();
  keyword = '';
  currentPage = 1;
  total = 0;

  constructor() {
   effect(() => {
      this.total = this.store.list().total;
      this.currentPage = this.store.list().page;
   })
  }

  searchForm = this.fb.group({
    keyword: this.fb.control(''),
  });

  submitForm(): void {
    if (this.keyword !== this.searchForm.value.keyword) {
        this.keyword = this.searchForm.value.keyword || '';
        this.store.loadVocabularyList({keyword: this.keyword, page: this.currentPage});
    }
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  pageChange($event: any) {
    this.store.loadVocabularyList({keyword: this.keyword, page: $event});
  }
}
