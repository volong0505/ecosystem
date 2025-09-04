import { Component, Input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'shared-ui-tag-component',
  imports: [
    NzTagModule,
  ],
  templateUrl: './tag-component.html',
  styleUrl: './tag-component.css',
})
export class TagComponent {
    @Input() tagText: string = 'Tag';

}
