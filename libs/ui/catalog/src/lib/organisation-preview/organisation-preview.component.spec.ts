import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'

import { OrganisationPreviewComponent } from './organisation-preview.component'

@Component({
  selector: 'gn-ui-thumbnail',
  template: '<div></div>',
})
class RecordThumbnailMockComponent {
  @Input() thumbnailUrl: string
  @Input() fit: string
}

const organisationMock = {
  name: 'my org',
  description: 'not much',
  logoUrl: 'https://mygreatlogo.org',
  recordCount: 10,
}

describe('OrganisationPreviewComponent', () => {
  let component: OrganisationPreviewComponent
  let fixture: ComponentFixture<OrganisationPreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OrganisationPreviewComponent,
        RecordThumbnailMockComponent,
      ],
      imports: [MatIconModule],
    }).compileComponents()

    fixture = TestBed.createComponent(OrganisationPreviewComponent)
    component = fixture.componentInstance
    component.organisation = organisationMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
