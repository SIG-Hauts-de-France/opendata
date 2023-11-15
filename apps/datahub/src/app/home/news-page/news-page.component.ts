import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordsService } from '@geonetwork-ui/feature/catalog'
import { startWith } from 'rxjs/operators'

@Component({
  selector: 'datahub-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageComponent {
  recordsCount$ = this.catalogRecords.recordsCount$.pipe(startWith('-'))

  constructor(
    private catalogRecords: RecordsService
  ) {}
}
