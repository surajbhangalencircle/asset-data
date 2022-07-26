import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssetDataState, AssetState, MeasurementState, selectAll } from "./asset-chart.reducers";



export const assetFeatureSelector = createFeatureSelector<AssetState>('asset');
export const measurementFeatureSelector = createFeatureSelector<MeasurementState>('measurement');
export const assetDataFeatureSelector = createFeatureSelector<AssetDataState>('assetData');

export const getAssets = createSelector(
  assetFeatureSelector,
  selectAll
);

export const areAssetsLoaded = createSelector(
  assetFeatureSelector,
  state => state.assetsLoaded
);

export const getMeasurements = createSelector(
  measurementFeatureSelector,
  state => state
);

export const areMeasurementsLoaded = createSelector(
  measurementFeatureSelector,
  state => state.measurementsLoaded
);

export const getSelectedAsset = createSelector(
  assetDataFeatureSelector,
  state => state
);

export const areAssetDataLoaded = createSelector(
    assetDataFeatureSelector,
    state => state
);