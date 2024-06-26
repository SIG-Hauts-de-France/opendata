import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { FormFieldArrayComponent } from './form-field-array/form-field-array.component'
import { FormFieldFileComponent } from './form-field-file/form-field-file.component'
import { FormFieldObjectComponent } from './form-field-object/form-field-object.component'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'
import { FormFieldSimpleComponent } from './form-field-simple/form-field-simple.component'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldTemporalExtentComponent } from './form-field-temporal-extent/form-field-temporal-extent.component'
import { FormFieldComponent } from './form-field.component'
import { FormFieldWrapperComponent } from '@geonetwork-ui/ui/layout'
import { EditableLabelDirective } from '@geonetwork-ui/ui/inputs'

describe('FormFieldComponent', () => {
  let component: FormFieldComponent
  let fixture: ComponentFixture<FormFieldComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(FormFieldComponent)
    component = fixture.componentInstance
    component.config = {
      type: 'text',
      labelKey: 'my.label',
    }
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('abstract field', () => {
    let formField
    beforeEach(() => {
      component.model = 'abstract'
      component.value = 'Some rich abstract value'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldRichComponent)
      ).componentInstance
    })
    it('creates a rich text form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('simple field', () => {
    let fieldWrapper
    let formField
    beforeEach(async () => {
      component.config.type = 'url'
      fixture.detectChanges()
      await fixture.whenStable()
      fieldWrapper = fixture.debugElement.query(
        By.directive(FormFieldWrapperComponent)
      ).componentInstance
      formField = fixture.debugElement.query(
        By.directive(FormFieldSimpleComponent)
      ).componentInstance
    })
    it('creates a simple form field', () => {
      expect(formField).toBeTruthy()
      expect(formField.type).toEqual(component.config.type)
      expect(formField.readonly).toEqual(component.config.locked)
      expect(formField.invalid).toEqual(component.config.invalid)
    })
    it('creates a form field wrapper', () => {
      expect(fieldWrapper).toBeTruthy()
    })
  })
  describe('simple field (invalid)', () => {
    let formField
    beforeEach(async () => {
      component.config.type = 'number'
      component.config.invalid = true
      component.config.invalidHintKey = 'something.is.wrong'
      fixture.detectChanges()
      await fixture.whenStable()
      formField = fixture.debugElement.query(
        By.directive(FormFieldSimpleComponent)
      ).componentInstance
    })
    it('shows a simple form field as invalid', () => {
      expect(formField).toBeTruthy()
      expect(formField.type).toEqual(component.config.type)
      expect(formField.invalid).toEqual(true)
    })
    it('shows the invalid hint key', () => {
      const hint = fixture.debugElement.query(By.css('.field-invalid-hint'))
      expect(hint.nativeElement.textContent).toContain(
        component.config.invalidHintKey
      )
    })
  })
  describe('simple field (invalid and locked)', () => {
    let formField
    beforeEach(async () => {
      component.config.type = 'number'
      component.config.locked = true
      component.config.invalid = true
      fixture.detectChanges()
      await fixture.whenStable()
      formField = fixture.debugElement.query(
        By.directive(FormFieldSimpleComponent)
      ).componentInstance
    })
    it('shows a simple form field as locked (but not invalid)', () => {
      expect(formField).toBeTruthy()
      expect(formField.type).toEqual(component.config.type)
      expect(formField.readonly).toEqual(true)
      expect(formField.invalid).toEqual(false)
    })
  })
  describe('file field', () => {
    let formField
    beforeEach(() => {
      component.config.type = 'file'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldFileComponent)
      ).componentInstance
    })
    it('creates a file form field', () => {
      expect(formField).toBeTruthy()
      expect(formField.readonly).toEqual(component.config.locked)
    })
  })
  describe('spatial extent field', () => {
    let formField
    beforeEach(() => {
      component.config.type = 'spatial_extent'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldSpatialExtentComponent)
      ).componentInstance
    })
    it('creates an array form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('temporal extent field', () => {
    let formField
    beforeEach(() => {
      component.config.type = 'temporal_extent'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldTemporalExtentComponent)
      ).componentInstance
    })
    it('creates an array form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('array field', () => {
    let formField
    beforeEach(() => {
      component.config.type = 'array'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldArrayComponent)
      ).componentInstance
    })
    it('creates an array form field', () => {
      expect(formField).toBeTruthy()
    })
  })
  describe('object field', () => {
    let formField
    beforeEach(() => {
      component.config.type = 'object'
      fixture.detectChanges()
      formField = fixture.debugElement.query(
        By.directive(FormFieldObjectComponent)
      ).componentInstance
    })
    it('creates an object form field', () => {
      expect(formField).toBeTruthy()
    })
  })
})
