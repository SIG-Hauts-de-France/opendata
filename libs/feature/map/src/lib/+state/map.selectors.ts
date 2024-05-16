import { createFeatureSelector, createSelector } from '@ngrx/store'
import { MAP_FEATURE_KEY, MapState } from './map.reducer'

// Lookup the 'Map' feature state managed by NgRx
export const getMapState = createFeatureSelector<MapState>(MAP_FEATURE_KEY)

export const getMapLayers = createSelector(
  getMapState,
  (state: MapState) => state.layers
)
