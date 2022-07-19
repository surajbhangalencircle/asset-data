import { createAction, props } from '@ngrx/store';
import { AssetData } from '../model/assetData.model';
import { Asset } from '../model/assets.model';
import { Measurement } from '../model/measurements.model';




export const loadAssets = createAction(
  '[Assets] Load assets via Service',
);

export const assetsLoaded = createAction(
  '[Assets Effect] assets Loaded Successfully',
  props<{ asset: Asset[] }>()
);

export const loadMeasurements = createAction(
  '[Measurements] Load measurements via service',
);

export const measurementsLoaded = createAction(
  '[Measurements Effect] Measurements Loaded Successfully',
  props<{ measurements: Measurement[] }>()
);

export const currentAsset = createAction(
  '[Assets] Get currently selected asset',
  props<{ assetId: number }>()
);

export const setChartData = createAction(
  '[assetData] Get asset data for current asset',
  props<{ assetData: AssetData[] }>()
);

export const assetActionTypes = {
  loadAssets,
  assetsLoaded,
  loadMeasurements,
  measurementsLoaded,
  currentAsset,
  setChartData
};

