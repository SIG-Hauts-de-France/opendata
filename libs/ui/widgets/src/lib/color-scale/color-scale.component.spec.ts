import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ColorScaleComponent } from './color-scale.component'

describe('ColorScaleComponent', () => {
  let component: ColorScaleComponent
  let fixture: ComponentFixture<ColorScaleComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorScaleComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorScaleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
