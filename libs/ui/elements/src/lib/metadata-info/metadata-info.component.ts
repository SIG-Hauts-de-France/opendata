import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { DatasetRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-metadata-info',
  templateUrl: './metadata-info.component.html',
  styleUrls: ['./metadata-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataInfoComponent {
  @Input() metadata: Partial<DatasetRecord>
  @Input() incomplete: boolean
  @Output() otherKeyword = new EventEmitter<string>()
  @Output() placeKeyword = new EventEmitter<string>()
  @Output() themeSIG = new EventEmitter<string>()
  updatedTimes: number

  get hasUsage() {
    return (
      this.metadata.extras?.isOpenData === true ||
      this.metadata.useLimitations?.length ||
      this.metadata.accessConstraints?.length
    )
  }

  get usages(): string[] {
    let array = []
    if (this.metadata.useLimitations?.length) {
      array = array.concat(this.metadata.useLimitations)
    }
    if (this.metadata.accessConstraints?.length) {
      array = array.concat(this.metadata.accessConstraints.map((c) => c.text))
    }
    return array
  }

  get updateFrequency(): string {
    if (this.metadata.updateFrequency instanceof Object) {
      this.updatedTimes = this.metadata.updateFrequency.updatedTimes
      return `domain.record.updateFrequency.${this.metadata.updateFrequency.per}`
    } else {
      return `domain.record.updateFrequency.${this.metadata.updateFrequency}`
    }
  }

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.metadata
  }

  onPlaceKeywordClick(keyword: string) {
    this.placeKeyword.emit(keyword);
  }

  onOtherKeywordClick(keyword: string) {
    this.otherKeyword.emit(keyword)
  }

  onThemeSIGClick(theme: string) {
    this.themeSIG.emit(theme)
  }

  private isLessOneMonth(date: Date) {
    const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date().getTime();
    const recordCreatedDate = date?.getTime() || 0;
    const difference = currentDate - recordCreatedDate;
    return difference < oneMonthInMillis;
  }

  get isNew(): boolean {
    return this.isLessOneMonth(this.metadata.datasetCreated);
  }

  get isUpdated(): boolean {
    return this.isLessOneMonth(this.metadata.datasetUpdated);
  }
}
