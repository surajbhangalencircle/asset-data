import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssetDataState, AssetState, MeasurementState, selectAll } from "./asset-chart.reducers";


export const assetFeatureSelector = createFeatureSelector<AssetState>('asset');
export const measurementFeatureSelector = createFeatureSelector<MeasurementState>('measurement');
export const assetDataFeatureSelector = createFeatureSelector<AssetDataState>('assetData');

export const areAssetsLoaded = createSelector(
    assetFeatureSelector,
  state => state.assetsLoaded
);

export const areMeasurementsLoaded = createSelector(
    measurementFeatureSelector,
  state => state.measurementsLoaded
);

export const areAssetDataLoaded = createSelector(
    assetDataFeatureSelector,
  state => state.setChartData
);