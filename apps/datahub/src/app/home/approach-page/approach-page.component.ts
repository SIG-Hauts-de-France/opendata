import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchService } from '@geonetwork-ui/feature/search'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { Organization } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'datahub-approach-page',
  templateUrl: './approach-page.component.html',
  styleUrls: ['./approach-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproachPageComponent {
  constructor() {}
}
