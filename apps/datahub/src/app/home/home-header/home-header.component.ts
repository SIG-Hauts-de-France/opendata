import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  RouterFacade,
  ROUTER_ROUTE_SEARCH,
} from '@geonetwork-ui/feature/router'
import { SearchService } from '@geonetwork-ui/feature/search'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { map } from 'rxjs/operators'
import {
  ROUTER_ROUTE_HOME,
  ROUTER_ROUTE_NEWS,
  ROUTER_ROUTE_ORGANISATION,
} from '../../router/constants'

marker('datahub.header.myfavorites')
marker('datahub.header.connex')
marker('datahub.header.lastRecords')
marker('datahub.header.popularRecords')

@Component({
  selector: 'datahub-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
  @Input() expandRatio: number

  searchInputRouteValue$ = this.routerFacade.anySearch$.pipe(
    map((any) => ({ title: any }))
  )
  currentRoute$ = this.routerFacade.currentRoute$.pipe(
    map((route) => route.routeConfig.path)
  )
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`

  constructor(
    public routerFacade: RouterFacade,
    private searchService: SearchService
  ) {}

  onFuzzySearchSelection(record: MetadataRecord) {
    this.routerFacade.goToMetadata(record)
  }

  onNewsClick(): void {
    this.routerFacade.go({ path: `${ROUTER_ROUTE_HOME}/${ROUTER_ROUTE_NEWS}` })
  }

  onDatasetsClick(): void {
    this.routerFacade.go({
      path: `${ROUTER_ROUTE_HOME}/${ROUTER_ROUTE_SEARCH}`,
    })
    this.searchService.updateSearch({})
  }

  onOrganisationsClick(): void {
    this.routerFacade.go({
      path: `${ROUTER_ROUTE_HOME}/${ROUTER_ROUTE_ORGANISATION}`,
    })
  }
}
